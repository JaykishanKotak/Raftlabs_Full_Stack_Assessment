import mongoose from 'mongoose';
import Review from '../models/review.model';
import Dish from '../models/dish.model';
import Restaurant from '../models/restaurant.model';
import Menu from '../models/menu.model';

export class ReviewService {
  static async submitReview(
    userId: string,
    reviewData: {
      dish: string;
      restaurant: string;
      rating: number;
      comment?: string;
    },
  ) {
    const { dish, restaurant, rating, comment } = reviewData;

    const dishId = new mongoose.Types.ObjectId(dish);
    const restaurantId = new mongoose.Types.ObjectId(restaurant);
    const uId = new mongoose.Types.ObjectId(userId);

    // 1. Create the review
    const review = await Review.create({
      user: uId,
      dish: dishId,
      restaurant: restaurantId,
      rating,
      comment,
    });

    // 2. Update Dish average rating
    const dishStats = await Review.aggregate([
      { $match: { dish: dishId } },
      {
        $group: {
          _id: '$dish',
          averageRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    if (dishStats.length > 0) {
      await Dish.findByIdAndUpdate(dishId, {
        averageRating: Math.round(dishStats[0].averageRating * 10) / 10,
        ratingCount: dishStats[0].count,
      });
    }

    // 3. Update Restaurant average rating (average of its dishes' average ratings)
    const restaurantDishes = await Menu.find({
      restaurant: restaurantId,
    }).distinct('dish');

    const restaurantStats = await Dish.aggregate([
      { $match: { _id: { $in: restaurantDishes } } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$averageRating' },
          totalCount: { $sum: '$ratingCount' },
        },
      },
    ]);

    if (restaurantStats.length > 0) {
      await Restaurant.findByIdAndUpdate(restaurantId, {
        averageRating: Math.round(restaurantStats[0].avgRating * 10) / 10,
        ratingCount: restaurantStats[0].totalCount,
      });
    }

    return review;
  }

  static async getDishReviews(dishId: string) {
    return await Review.find({ dish: new mongoose.Types.ObjectId(dishId) })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
  }
}
