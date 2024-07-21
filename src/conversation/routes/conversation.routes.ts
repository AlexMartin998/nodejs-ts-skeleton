import { Router } from 'express';

import { diContainer } from '@/shared/infrastructure/config';
import { ConversationController } from '../controllers';

export class ConversationRoutes {
  static get routes(): Router {
    const router = Router();

    const conversationController = diContainer.resolve<ConversationController>('conversationController');

    router.post('/', (req, res) => conversationController.create(req, res));
    router.get('/', (req, res) => conversationController.findAll(req, res));
    router.get('/:id', (req, res) => conversationController.findOne(req, res));
    router.patch('/:id', (req, res) => conversationController.update(req, res));
    router.delete('/:id', (req, res) => conversationController.delete(req, res));

    return router;
  }
}