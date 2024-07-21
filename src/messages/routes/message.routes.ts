import { Router, Request, Response } from 'express';

import { diContainer } from '@/shared/infrastructure/config';
import { AuthMiddleware } from '@/shared/infrastructure/server/middlewares';
import { MessageController } from '../controllers';

export class MessageRoutes {
  static get routes(): Router {
    const router = Router();

    const messageController =
      diContainer.resolve<MessageController>('messageController');

    router.post(
      '/send/:id',
      [AuthMiddleware.validateJWT],
      (req: Request, res: Response) => messageController.sendMessage(req, res)
    );
    router.get(
      '/chat/:id', // user you want to chat with
      [AuthMiddleware.validateJWT],
      (req: Request, res: Response) =>
        messageController.getMessagesByParticipant(req, res)
    );

    router.post('/', (req: Request, res: Response) =>
      messageController.create(req, res)
    );
    router.get('/', (req: Request, res: Response) =>
      messageController.findAll(req, res)
    );
    router.get('/:id', (req: Request, res: Response) =>
      messageController.findOne(req, res)
    );
    router.patch('/:id', (req: Request, res: Response) =>
      messageController.update(req, res)
    );
    router.delete('/:id', (req: Request, res: Response) =>
      messageController.delete(req, res)
    );

    return router;
  }
}
