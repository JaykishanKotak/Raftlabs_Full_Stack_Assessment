import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../types/order.type';

const orderSchema = new Schema<IOrder>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Order must be associated with a restaurant'],
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must be associated with a customer'],
    },
    deliveryDetails: {
      state: {
        type: String,
        required: [true, 'State is required for delivery address'],
      },
      phoneNumber: {
        type: String,
        required: false,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
      },
      name: {
        type: String,
        required: [true, 'Recipient name is required for delivery address'],
      },
      city: {
        type: String,
        required: [true, 'City is required for delivery address'],
      },
      address: {
        type: String,
        required: [true, 'Address line is required for delivery address'],
      },
      pinCode: {
        type: String,
        required: [true, 'Pin code is required for delivery address'],
        match: [/^\d{6}$/, 'Please provide a valid 6-digit pin code'],
      },
    },
    items: [
      {
        menuItemId: {
          type: Schema.Types.ObjectId,
          ref: 'Menu', // Changed from MenuItem to Menu
          required: [true, 'Menu item ID is required'],
        },
        name: { type: String, required: true }, // Stored as a snapshot
        price: { type: Number, required: true }, // Stored as a snapshot
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    status: {
      type: String,
      enum: {
        values: [
          'ORDER_RECEIVED',
          'PREPARING',
          'OUT_FOR_DELIVERY',
          'DELIVERED',
          'CANCELLED',
        ],
        message: '{VALUE} is not a valid order status',
      },
      default: 'ORDER_RECEIVED',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true },
);

// Auto-push to history on status change
// orderSchema.pre("save", function (next) {
//   if (this.isModified("status")) {
//     this.statusHistory.push({
//       status: this.status,
//       updatedAt: new Date(),
//     });
//   }
//   next();
// });

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
