import { Router } from 'express';

import { UsersRoutes } from '@/users/users.routes';


export class AppRouter {

  static get routes(): Router {
    const router = Router();

    router.use('/api', UsersRoutes.routes);

    return router;
  }

}