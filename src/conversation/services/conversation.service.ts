import {
  ConversationDto,
  CreateConversationDto,
  UpdConversationDto,
} from '@/conversation/dtos';
import { PaginationDto, PaginationResponseDto } from '@/shared/dtos';

export interface ConversationService {
  create(createDto: CreateConversationDto): Promise<ConversationDto>;

  findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponseDto<ConversationDto>>;

  findOne(id: string): Promise<ConversationDto>;

  update(id: string, updDto: UpdConversationDto): Promise<ConversationDto>;

  delete(id: string): Promise<void>;
}
