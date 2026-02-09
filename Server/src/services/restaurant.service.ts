import Restaurant from '../models/restaurant.model';
import Dish from '../models/dish.model';
import Menu from '../models/menu.model';
import { ApiError } from '../utils/ApiError';

export class RestaurantService {
  static async getRestaurants(filters: any) {
    const { city, state, search, foodTypes, page = 1, limit = 10 } = filters;
    const query: any = {};

    if (city) {
      query.city = { $regex: new RegExp(city as string, 'i') };
    }

    if (state) {
      query.state = { $regex: new RegExp(state as string, 'i') };
    }

    if (search) {
      query.name = { $regex: new RegExp(search as string, 'i') };
    }

    if (foodTypes) {
      const types = Array.isArray(foodTypes) ? foodTypes : [foodTypes];

      // 1. Get all restaurants
      const allRestaurants = await Restaurant.find(query).populate(
        'owner',
        'name email',
      );

      // 2. Filter restaurants by their actual menu composition
      const filteredItems = [];
      for (const res of allRestaurants) {
        const dishIds = await Menu.find({ restaurant: res._id }).distinct(
          'dish',
        );
        const resFoodTypes = await Dish.find({
          _id: { $in: dishIds },
        }).distinct('foodType');

        // Check if ALL food types served by this restaurant are within the requested types
        // (e.g., if user asks for VEG, and restaurant serves VEG & NON_VEG, it's excluded)
        const isMatch =
          resFoodTypes.length > 0 &&
          resFoodTypes.every((t) => types.includes(t));

        if (isMatch) {
          filteredItems.push({
            ...res.toObject(),
            foodTypes: resFoodTypes,
          });
        }
      }

      const total = filteredItems.length;
      const skip = (Number(page) - 1) * Number(limit);
      const paginatedItems = filteredItems.slice(skip, skip + Number(limit));

      return {
        restaurants: paginatedItems,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .populate('owner', 'name email')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Restaurant.countDocuments(query),
    ]);

    const items = await Promise.all(
      restaurants.map(async (res) => {
        const dishIds = await Menu.find({ restaurant: res._id }).distinct(
          'dish',
        );
        const resFoodTypes = await Dish.find({
          _id: { $in: dishIds },
        }).distinct('foodType');
        return {
          ...res.toObject(),
          foodTypes: resFoodTypes,
        };
      }),
    );

    return {
      restaurants: items,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  static async getRestaurantById(id: string) {
    const restaurant = await Restaurant.findById(id).populate(
      'owner',
      'name email',
    );
    if (!restaurant) {
      throw new ApiError(404, 'Restaurant not found');
    }
    return restaurant;
  }

  static async getPopularRestaurants(limit: number = 5) {
    const Order = (await import('../models/order.model')).default;

    // Most visited based on order count
    const popular = await Order.aggregate([
      { $group: { _id: '$restaurant', visits: { $sum: 1 } } },
      { $sort: { visits: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'restaurants',
          localField: '_id',
          foreignField: '_id',
          as: 'details',
        },
      },
      { $unwind: '$details' },
    ]);

    return popular;
  }

  static async getTopRated(limit: number = 5) {
    return await Restaurant.find()
      .sort({ averageRating: -1, ratingCount: -1 })
      .limit(limit);
  }
}
