import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    productQuantity: {
      type: Number,
    },
    releaseDate: {
      type: Date,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    operatingSystem: {
      type: String,
    },
    storageCapacity: {
      type: String,
    },
    screenSize: {
      type: String,
    },
    cameraQuality: {
      type: String,
    },
    batteryLife: {
      type: String,
    },
    color: {
      type: String,
    },
    processor: {
      type: String,
    },
    RAM: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
