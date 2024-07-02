/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req,res) => {
    const product = req.body;
    const result = await ProductServices.createProductIntoDB(product); 

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product created succesfully!',
        data: result,
      });

})

const getAllProducts = catchAsync(async (req,res) => {
    const filters: Record<string, any> = req.query;
    const result = await ProductServices.getAllProductsFromDB(filters);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product retrived succesfully!',
        data: result,
      });

})

const updateProducts = catchAsync(async(req, res) => {
    const {id} = req.params;
    const product = req.body;
    const result = await ProductServices.updateProductFromDB(id, product);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product updated succesfully!',
        data: result,
      });
})


const deleteProducts = catchAsync(async(req, res) => {
    const {ids} = req.body;
    const result = await ProductServices.deleteProductFromDB(ids);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products Deleted succesfully!',
        data: result,
      });
})


export const ProductController = {
    createProduct,
    getAllProducts,
    updateProducts,
    deleteProducts
}