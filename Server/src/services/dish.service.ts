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

  static async getDishById(restaurantId: string, dishId: string) {
    const menu = await Menu.findOne({
      restaurant: restaurantId,
      dish: dishId,
    })
      .select('price isAvailable restaurant dish')
      .populate(
        'dish',
        'name baseDescription foodType baseIngredients imageUrl averageRating ratingCount',
      )
      .populate('restaurant', 'name city address state averageRating');

    if (!menu) {
      throw new ApiError(404, 'Menu or dish not found');
    }

    // Find all restaurants serving this dish
    const menus = await Menu.find({ dish: dishId })
      .select('price isAvailable restaurant')
      .populate('restaurant', 'name city state averageRating');

    return {
      dish: menu.dish,
      price: menu.price,
      isAvailable: menu.isAvailable,
      restaurant: menu.restaurant,
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
