import { Router } from 'express';

import { diContainer } from '@/shared/infrastructure/config';
import { MessageController } from '../controllers';

export class MessageRoutes {
  static get routes(): Router {
    const router = Router();

    const messageController =
      diContainer.resolve<MessageController>('messageController');

    router.post('/', (req, res) => messageController.create(req, res));
    router.get('/', (req, res) => messageController.findAll(req, res));
    router.get('/:id', (req, res) => messageController.findOne(req, res));
    router.patch('/:id', (req, res) => messageController.update(req, res));
    router.delete('/:id', (req, res) => messageController.delete(req, res));

    return router;
  }
}
