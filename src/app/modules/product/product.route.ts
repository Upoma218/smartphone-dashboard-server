import { Router } from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.post(
  '/create-product',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  ProductController.getAllProducts,
);

router.put(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProducts,
);

router.delete('/delete-products', auth(USER_ROLE.superAdmin), ProductController.deleteProducts);

export const ProductRoute = router;
