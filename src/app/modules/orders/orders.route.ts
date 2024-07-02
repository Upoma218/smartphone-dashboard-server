import { Router } from "express";
import { OrderValidation } from "./orders.validation";
import { OrdersController } from "./orders.controller";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();


router.post('/create-order', 
auth(
    USER_ROLE.superAdmin,
    USER_ROLE.manager,
    USER_ROLE.seller
),
validateRequest(OrderValidation.orderValidationSchema),
OrdersController.createOrder);

router.get('/:category',
auth(
    USER_ROLE.superAdmin,
    USER_ROLE.manager,
    USER_ROLE.seller
), 
OrdersController.getSalesHistory);

export const OrderRoute = router;