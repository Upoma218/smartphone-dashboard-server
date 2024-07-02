import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./orders.service";
import catchAsync from "../../utils/catchAsync";


const createOrder = catchAsync(async (req,res) => {
    const product = req.body;
    const result = await OrderService.createOrderIntoDB(product, req.user); 

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order created succesfully!',
        data: result,
      });

})

const getSalesHistory = catchAsync(async (req, res) => {
  const query = req.query as Record<string, string>;
    const { category} = req.params;
    const result = await OrderService.getSalesHistoryFromDB(category, query, req.user );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Sales history for ${category} retrieved successfully!`,
      data: result,
    });
  });


export const OrdersController = {
    createOrder,
    getSalesHistory
}