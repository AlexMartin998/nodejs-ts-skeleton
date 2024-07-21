import { CreateMessageDto, MessageDto, UpdMessageDto } from '@/messages/dtos';
import { PaginationDto, PaginationResponseDto } from '@/shared/dtos';

export interface MessageService {
  create(createDto: CreateMessageDto): Promise<MessageDto>;

  findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponseDto<MessageDto>>;

  findOne(id: string): Promise<MessageDto>;

  update(id: string, updDto: UpdMessageDto): Promise<MessageDto>;

  delete(id: string): Promise<void>;
}
