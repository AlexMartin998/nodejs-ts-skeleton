import { CreateMessageDto, UpdMessageDto } from '@/messages/dtos';
import { ResourceNotFoundError } from '@/shared/domain';
import { MessageModel } from '../models';
import { MessageService } from './message.service';

export class MessageServiceImpl implements MessageService {
  constructor(private readonly messageModel: typeof MessageModel) {}

  async create(createDto: CreateMessageDto): Promise<any> {
    return this.messageModel.create(createDto);
  }

  async update(id: string, updDto: UpdMessageDto): Promise<any> {
    const message = await this.findMessageById(id);
    if (!message) throw new ResourceNotFoundError('Message not found');

    return this.messageModel.findByIdAndUpdate(id, updDto, {
      new: true,
    });
  }

  async findAll(): Promise<any> {
    return this.messageModel.find();
  }

  async findOne(id: string): Promise<void> {
    const message = await this.findMessageById(id);
    if (!message) throw new ResourceNotFoundError('Message not found');
    return message;
  }

  async delete(id: string): Promise<void> {
    const message = await this.findMessageById(id);
    if (!message) throw new ResourceNotFoundError('Message not found');
    this.messageModel.findByIdAndDelete(id);
  }

  private async findMessageById(id: string): Promise<any | null> {
    return this.messageModel.findById(id) || null;
  }
}
