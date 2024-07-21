import { CreateMessageDto, UpdMessageDto } from '@/messages/dtos';

export interface MessageService {
  create(createDto: CreateMessageDto): Promise<void>;

  update(id: string, updDto: UpdMessageDto): Promise<void>;

  findAll(): Promise<void>;

  findOne(id: string): Promise<void>;

  delete(id: string): Promise<void>;
}
