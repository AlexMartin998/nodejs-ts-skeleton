import {
  CreateMessageDto,
  MessageDto,
  MessagePopulatedDto,
  UpdMessageDto,
} from '@/messages/dtos';
import { ResourceNotFoundError } from '@/shared/domain';
import { PaginationDto, PaginationResponseDto } from '@/shared/dtos';
import { MessageModel } from '../models';
import { MessageService } from './message.service';

export class MessageServiceImpl implements MessageService {
  constructor(private readonly messageModel: typeof MessageModel) {}

  async create(createDto: CreateMessageDto): Promise<any> {
    const message = await this.messageModel.create(createDto);

    const populatedMessage = await this.messageModel
      .findById(message._id)
      .populate('sender')
      .populate('receiver')
      .lean(); // just read data

    return MessagePopulatedDto.create(populatedMessage!);
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponseDto<MessageDto>> {
    const { page, limit } = paginationDto;
    const [total, messages] = await Promise.all([
      this.messageModel.countDocuments(),
      this.messageModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    // return {
    //   page,
    //   limit,
    //   total,
    //   totalPages: Math.ceil(total / limit),
    //   messages: messages.map(MessageDto.create),
    // };
    return PaginationResponseDto.create<MessageDto>(
      page,
      limit,
      total,
      messages.map(MessageDto.create)
    );
  }

  async findOne(id: string): Promise<MessageDto> {
    const message = await this.findOneById(id);
    if (!message) throw new ResourceNotFoundError('Message not found');
    return MessageDto.create(message);
  }

  async update(id: string, updDto: UpdMessageDto): Promise<any> {
    const updMessage = await this.messageModel.findByIdAndUpdate(id, updDto, {
      new: true,
    });
    if (!updMessage) throw new ResourceNotFoundError('Message not found');

    return MessageDto.create(updMessage);
  }

  async delete(id: string): Promise<void> {
    const res = await this.messageModel.findByIdAndDelete(id);
    if (!res) throw new ResourceNotFoundError('Message not found');
  }

  private async findOneById(id: string): Promise<any | null> {
    return this.messageModel.findById(id) || null;
  }
}
