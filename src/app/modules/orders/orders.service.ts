/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TOrder } from './orders.interface';
import { Order } from './orders.model';
import { endOfDay, startOfDay, subDays, subMonths, subYears } from 'date-fns';
import { JwtPayload } from 'jsonwebtoken';

const createOrderIntoDB = async (payload: TOrder, user: JwtPayload) => {
  const getProduct = await Product.findById(payload.productId);

  if (!getProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  if (getProduct.productQuantity < payload.productQuantity) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Product is not sufficiant for order!',
    );
  }

  await Product.findByIdAndUpdate(
    payload.productId,
    { $inc: { productQuantity: -Number(payload.productQuantity) } },
    { runValidators: true },
  );
  payload.sellerId = user.userId;
  const result = await Order.create(payload);
  return result;
};

const getSalesHistoryFromDB = async (
  category: string,
  query: Record<string, string>,
  user: JwtPayload
) => {
  const currentDate = new Date(query.startDate || new Date().toString());

  let startDate, endDate;

  switch (category.toLowerCase()) {
    case 'weekly':
      startDate = subDays(currentDate, 6);
      endDate = currentDate;
      break;
    case 'daily':
      startDate = startOfDay(currentDate);
      endDate = endOfDay(currentDate);
      break;
    case 'monthly':
      startDate = subMonths(currentDate, 1);
      endDate = currentDate;
      break;
    case 'yearly':
      startDate = subYears(currentDate, 1);
      endDate = currentDate;
      break;
    default:
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid category');
  }
const historyQuery: Record<string, unknown> = {
  dateOfSale: {
    $gte: startDate,
    $lte: endDate,
  },
}
if(user.role==="seller"){
  historyQuery.sellerId = user.userId
}
  const salesHistory = await Order.find(historyQuery).populate('productId');

  return salesHistory;
};

export const OrderService = {
  createOrderIntoDB,
  getSalesHistoryFromDB,
};