import Order from '../models/order.model';
import Menu from '../models/menu.model';
import { ApiError } from '../utils/ApiError';
import { socketService } from './socket.service';
import { Types } from 'mongoose';

export class OrderService {
  static async createOrder(
    userId: string,
    orderData: {
      restaurant: string;
      items: { menuItemId: string; quantity: number }[];
    },
  ) {
    const { restaurant, items } = orderData;

    if (!items || items.length === 0) {
      throw new ApiError(400, 'Order must contain at least one item');
    }

    const orderItems = [];
    let totalAmount = 0;

    // Validate items and calculate total amount
    for (const item of items) {
      const menu: any = await Menu.findOne({
        dish: item.menuItemId,
        restaurant,
      }).populate('dish', 'name price');

      if (!menu) {
        throw new ApiError(
          404,
          `Menu item with ID ${item.menuItemId} not found`,
        );
      }

      if (menu.restaurant.toString() !== restaurant) {
        throw new ApiError(
          400,
          `Menu item ${item.menuItemId} does not belong to the selected restaurant`,
        );
      }

      if (!menu.isAvailable) {
        throw new ApiError(
          400,
          `Menu item ${(menu.dish as any).name} is currently unavailable`,
        );
      }

      const itemTotalPrice = menu.price * item.quantity;
      totalAmount += itemTotalPrice;

      orderItems.push({
        menuItemId: menu._id,
        name: (menu.dish as any).name,
        price: menu.price,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      restaurant,
      customer: userId,
      items: orderItems,
      totalAmount,
      status: 'ORDER_RECEIVED',
      statusHistory: [
        {
          status: 'ORDER_RECEIVED',
          updatedBy: userId,
        },
      ],
    });

    // Start simulation of order updates
    this.simulateOrderUpdates(order._id.toString());

    return order;
  }

  static async getMyOrders(userId: string, filters: any) {
    const { status, page = 1, limit = 10 } = filters;

    const query: any = {
      customer: userId,
    };

    if (status) {
      query.status = { $in: status };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('restaurant', 'name city')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      Order.countDocuments(query),
    ]);

    return {
      orders: orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  static async getOrderById(orderId: string, userId: string) {
    const order = await Order.findById(orderId)
      .populate('restaurant', 'name city address')
      .populate('items.menuItemId');

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    // Security check: Only the customer or the restaurant owner (if we had that logic here) can see the order
    if (order.customer.toString() !== userId) {
      throw new ApiError(403, 'You are not authorized to view this order');
    }

    return order;
  }

  static async updateOrderStatus(
    orderId: string,
    status: string,
    userId?: string,
  ) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    order.status = status as any;
    order.statusHistory.push({
      status,
      updatedAt: new Date(),
      updatedBy: userId ? new Types.ObjectId(userId) : undefined,
    });

    await order.save();

    // Notify user via WebSocket
    socketService.sendToUser(order.customer.toString(), {
      type: 'ORDER_STATUS_UPDATE',
      orderId: order._id,
      status: order.status,
    });

    return order;
  }

  static simulateOrderUpdates(orderId: string) {
    const statuses = ['PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const delay = 10000; // 10 seconds between each status for better visibility

    statuses.forEach((status, index) => {
      setTimeout(
        async () => {
          try {
            await this.updateOrderStatus(orderId, status);
            console.log(
              `✅ Simulated status update for order ${orderId}: ${status}`,
            );
          } catch (error) {
            console.error(`❌ Failed to update simulated status:`, error);
          }
        },
        delay * (index + 1),
      );
    });
  }
}
