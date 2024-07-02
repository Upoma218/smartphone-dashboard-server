import { z } from 'zod';

const createProductValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: 'Product name should not be empty' }),
  productPrice: z
    .number()
    .min(0.01, { message: 'Product price should be greater than 0' }),
  productQuantity: z
    .number()
    .min(1, { message: 'Product quantity should be at least 1' }),
  brand: z.string().min(1, { message: 'Brand should not be empty' }),
  model: z.string().min(1, { message: 'Model should not be empty' }),
  operatingSystem: z
    .string()
    .min(1, { message: 'Operating system should not be empty' }),
  storageCapacity: z
    .string()
    .min(1, { message: 'Storage capacity should not be empty' }),
  screenSize: z.string().min(1, { message: 'Screen size should not be empty' }),
  cameraQuality: z.string().optional(),
  batteryLife: z.string().optional(),
  color: z.string().optional(),
  processor: z.string().optional(),
  RAM: z.string().optional(),
});

const updateProductValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: 'Product name should not be empty' }).optional(),
  productPrice: z
    .number()
    .min(0.01, { message: 'Product price should be greater than 0' }).optional(),
  productQuantity: z
    .number()
    .min(1, { message: 'Product quantity should be at least 1' }).optional(),
  brand: z.string().min(1, { message: 'Brand should not be empty' }).optional(),
  model: z.string().min(1, { message: 'Model should not be empty' }).optional(),
  operatingSystem: z
    .string()
    .min(1, { message: 'Operating system should not be empty' }).optional(),
  storageCapacity: z
    .string()
    .min(1, { message: 'Storage capacity should not be empty' }).optional(),
  screenSize: z.string().min(1, { message: 'Screen size should not be empty' }).optional(),
  cameraQuality: z.string().optional(),
  batteryLife: z.string().optional(),
  color: z.string().optional(),
  processor: z.string().optional(),
  RAM: z.string().optional(),
});

export const ProductValidation = {
   createProductValidationSchema,
   updateProductValidationSchema
};
