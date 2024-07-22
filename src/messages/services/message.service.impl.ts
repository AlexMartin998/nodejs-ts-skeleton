import { ConversationModel } from '@/conversation/models';
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
import { IoService } from '@/shared/application/wss.service';

export class MessageServiceImpl implements MessageService {
  constructor(
    private readonly messageModel: typeof MessageModel,
    private readonly conversationModel: typeof ConversationModel
  ) {}

  async sendMessage(createDto: CreateMessageDto): Promise<MessageDto> {
    const conversation = await this.handleConversation(
      createDto.receiver,
      createDto.sender
    );

    const newMessage = await this.messageModel.create(createDto);
    conversation.messages.push(newMessage._id);
    await conversation.save();

    ///* socket.io logic ------------
    const sioInstance = IoService.instance;
    const receiverSocketId = sioInstance.userSocketMap[createDto.receiver];
    if (receiverSocketId) {
      sioInstance.sendMessage('newMessage', newMessage);
    }

    return MessageDto.create(newMessage);
  }

  async getMessagesByParticipant(
    userToChatId: string,
    senderId: string
  ): Promise<MessageDto[]> {
    const conversation = await this.conversationModel
      .findOne({
        participants: { $all: [userToChatId, senderId] },
      })
      .populate('messages');
    if (!conversation) return [];

    return conversation.messages.map(message => MessageDto.create(message));
  }

  private async handleConversation(
    receiverId: string,
    senderId: string
  ): Promise<any> {
    let conversation = await this.conversationModel.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (!conversation) {
      conversation = await this.conversationModel.create({
        participants: [receiverId, senderId],
      });
    }

    return conversation;
  }

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
