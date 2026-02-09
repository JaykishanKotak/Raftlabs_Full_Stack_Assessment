import Dish from '../models/dish.model';
import Menu from '../models/menu.model';
import { ApiError } from '../utils/ApiError';

export class DishService {
  static async getDishes(filters: any) {
    const { search, foodType, restaurant, page = 1, limit = 10 } = filters;
    const query: any = {};

    if (search) {
      query.name = { $regex: new RegExp(search as string, 'i') };
    }

    if (foodType) {
      query.foodType = foodType;
    }

    const skip = (Number(page) - 1) * Number(limit);

    if (restaurant) {
      const [menuEntries, total] = await Promise.all([
        Menu.find({ restaurant })
          .populate('dish')
          .skip(skip)
          .limit(Number(limit)),
        Menu.countDocuments({ restaurant }),
      ]);

      const dishes = menuEntries.map((entry) => {
        const dishObj = (entry.dish as any).toObject
          ? (entry.dish as any).toObject()
          : entry.dish;
        return {
          ...dishObj,
          price: entry.price,
          isAvailable: entry.isAvailable,
          menuId: entry._id,
        };
      });

      return {
        dishes,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      };
    }

    const [dishes, total] = await Promise.all([
      Dish.find(query).skip(skip).limit(Number(limit)).sort({ name: 1 }),
      Dish.countDocuments(query),
    ]);

    return {
      dishes,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  static async getDishById(id: string) {
    const dish = await Dish.findById(id);
    if (!dish) {
      throw new ApiError(404, 'Dish not found');
    }

    // Also get restaurants serving this dish
    const menus = await Menu.find({ dish: id })
      .populate('restaurant', 'name city state averageRating')
      .select('restaurant price isAvailable');

    return {
      dish,
      availableAt: menus,
    };
  }

  static async getBestSellers(limit: number = 5) {
    // We aggregate over Orders to find most ordered dishes
    const Order = (await import('../models/order.model')).default;

    const bestSellers = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.menuItemId',
          totalSold: { $sum: '$items.quantity' },
          name: { $first: '$items.name' },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
    ]);

    return bestSellers;
  }

  static async getTopRated(limit: number = 5) {
    return await Dish.find()
      .sort({ averageRating: -1, ratingCount: -1 })
      .limit(limit);
  }
}
