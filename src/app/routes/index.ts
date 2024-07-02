import { Router } from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { ProductRoute } from '../modules/product/product.route';
import { OrderRoute } from '../modules/orders/orders.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/product',
    route: ProductRoute,
  },
  {
    path: '/order',
    route: OrderRoute,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
