import { Router } from 'express';

import { diContainer } from '@/shared/infrastructure/config';
import type { UsersController } from './users.controller';

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();

    ///* DI
    const usersController =
      diContainer.resolve<UsersController>('usersController');

    // // keep `this` in controllers without arrow functions
    router.post('/auth/register', (req, res) =>
      usersController.register(req, res)
    );
    router.post('/auth/login', (req, res) => usersController.login(req, res));

    return router;
  }
}
