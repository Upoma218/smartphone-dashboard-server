import { z } from "zod";

const orderValidationSchema = z.object({
    productId: z.string(),
    productQuantity: z.number(),
    nameOfBuyer: z.string({required_error: 'Buyer name is required'}),
    dateOfSale: z.string()
})

export const OrderValidation = {
    orderValidationSchema
}