import { Router, Request, Response } from 'express';

import { diContainer } from '@/shared/infrastructure/config';
import type { UsersController } from './users.controller';
import { AuthMiddleware } from '@/shared/infrastructure/server/middlewares';

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

    router.get(
      '/users',
      [AuthMiddleware.validateJWT],
      (req: Request, res: Response) => usersController.findAll(req, res)
    );

    return router;
  }
}
