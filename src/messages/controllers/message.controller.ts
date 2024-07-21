import { Request, Response } from 'express';

import { PaginationDto } from '@/shared/dtos';
import { handleRestExceptions } from '@/shared/infrastructure/server/utils';
import { CreateMessageDto, UpdMessageDto } from '../dtos';
import { MessageService } from '../services';

export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  async sendMessage(req: Request, res: Response) {
    try {
      const senderId = (req as any).user.id; // AuthMiddleware
      const receiverId = req.params.id;
      const createDto = CreateMessageDto.create({
        ...req.body,
        sender: senderId,
        receiver: receiverId,
      });

      const message = await this.messageService.sendMessage(createDto!);
      return res.status(200).json(message);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async getMessagesByParticipant(req: Request, res: Response) {
    try {
      const senderId = (req as any).user.id; // AuthMiddleware
      const messages = await this.messageService.getMessagesByParticipant(
        req.params.id, // user you want to chat with
        senderId
      );
      return res.status(200).json(messages);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  ///* script ========================== */
  async create(req: Request, res: Response) {
    try {
      const createDto = CreateMessageDto.create(req.body);
      const message = await this.messageService.create(createDto!);
      return res.status(201).json(message);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const paginationDto = PaginationDto.create(+page, +limit);
      const messages = await this.messageService.findAll(paginationDto!);

      return res.status(200).json(messages);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const message = await this.messageService.findOne(req.params.id);
      return res.status(200).json(message);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updDto = UpdMessageDto.create(req.body);
      const message = await this.messageService.update(req.params.id, updDto!);
      return res.status(200).json(message);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.messageService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }
}
