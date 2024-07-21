import {
  ConversationDto,
  CreateConversationDto,
  UpdConversationDto,
} from '@/conversation/dtos';
import { ResourceNotFoundError } from '@/shared/domain';
import { PaginationDto, PaginationResponseDto } from '@/shared/dtos';
import { ConversationModel } from '../models';
import { ConversationService } from './conversation.service';

export class ConversationServiceImpl implements ConversationService {
  constructor(private readonly conversationModel: typeof ConversationModel) {}

  async create(createDto: CreateConversationDto): Promise<ConversationDto> {
    const conversation = await this.conversationModel.create(createDto);

    return ConversationDto.create(conversation!);
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponseDto<ConversationDto>> {
    const { page, limit } = paginationDto;
    const [total, conversations] = await Promise.all([
      this.conversationModel.countDocuments(),
      this.conversationModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    return PaginationResponseDto.create<ConversationDto>(
      page,
      limit,
      total,
      conversations.map(ConversationDto.create)
    );
  }

  async findOne(id: string): Promise<ConversationDto> {
    const conversation = await this.findOneById(id);
    if (!conversation)
      throw new ResourceNotFoundError('Conversation not found');
    return ConversationDto.create(conversation);
  }

  async update(
    id: string,
    updDto: UpdConversationDto
  ): Promise<ConversationDto> {
    const conversation = await this.conversationModel.findByIdAndUpdate(
      id,
      updDto,
      { new: true }
    );
    if (!conversation)
      throw new ResourceNotFoundError('Conversation not found');

    return ConversationDto.create(conversation);
  }

  async delete(id: string): Promise<void> {
    const res = await this.conversationModel.findByIdAndDelete(id);
    if (!res) throw new ResourceNotFoundError('Conversation not found');
  }

  private async findOneById(id: string): Promise<any> {
    return this.conversationModel.findById(id) || null;
  }
}
