import { Request, Response } from 'express';

import { PaginationDto } from '@/shared/dtos';
import { handleRestExceptions } from '@/shared/infrastructure/server/utils';
import { CreateConversationDto, UpdConversationDto } from '../dtos';
import { ConversationService } from '../services';

export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  async create(req: Request, res: Response) {
    try {
        const createDto = CreateConversationDto.create(req.body);
        const conversation = await this.conversationService.create(createDto!);
        return res.status(201).json(conversation);
    } catch (error) {
        handleRestExceptions(error, res);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const paginationDto = PaginationDto.create(+page, +limit);
        const conversations = await this.conversationService.findAll(paginationDto!);

        return res.status(200).json(conversations);
    }
    catch (error) {
        handleRestExceptions(error, res);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
        const conversation = await this.conversationService.findOne(req.params.id);
        return res.status(200).json(conversation);
    }
    catch (error) {
        handleRestExceptions(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
        const updDto = UpdConversationDto.create(req.body);
        const conversation = await this.conversationService.update(req.params.id, updDto!);
        return res.status(200).json(conversation);
    }
    catch (error) {
        handleRestExceptions(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
        await this.conversationService.delete(req.params.id);
        return res.status(204).send();
    }
    catch (error) {
        handleRestExceptions(error, res);
    }
  }
}
