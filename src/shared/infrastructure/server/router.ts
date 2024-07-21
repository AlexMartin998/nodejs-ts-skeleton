import { Router } from 'express';

import { ConversationRoutes } from '@/conversation/routes';
import { MessageRoutes } from '@/messages/routes';
import { UsersRoutes } from '@/users/users.routes';


export class AppRouter {

  static get routes(): Router {
    const router = Router();

    router.use('/api', UsersRoutes.routes);
    router.use('/api/messages', MessageRoutes.routes);
    router.use('/api/conversations', ConversationRoutes.routes);

    return router;
  }

}
