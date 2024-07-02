import { Types } from "mongoose";

export type TOrder = {
    productId: Types.ObjectId;
    sellerId: string;
    productQuantity: number;
    nameOfBuyer: string;
    dateOfSale: Date
}