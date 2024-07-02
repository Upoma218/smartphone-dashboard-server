import { Schema, model } from 'mongoose';
import { TOrder } from './orders.interface';

const orderShema = new Schema<TOrder>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    sellerId: {
      type: String,
      ref: 'User',
    },
    productQuantity: {
      type: Number,
    },
    nameOfBuyer: {
      type: String,
    },
    dateOfSale: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderShema);
