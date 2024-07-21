import { UserDto } from '@/users/dtos';

export class MessageDto {
  private constructor(
    public readonly id: string,
    public readonly sender: string,
    public readonly receiver: string,
    public readonly message: string,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}

  static create(props: Record<string, any>): MessageDto {
    const { sender, receiver, message, _id, createdAt, updatedAt } = props;
    return new MessageDto(_id, sender, receiver, message, createdAt, updatedAt);
  }
}

export class MessagePopulatedDto {
  private constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly sender: UserDto,
    public readonly receiver: UserDto,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(props: Record<string, any>): MessagePopulatedDto {
    const { sender, receiver, message, createdAt, updatedAt, _id } = props;

    return new MessagePopulatedDto(
      _id,
      message,
      UserDto.create(sender),
      UserDto.create(receiver),
      new Date(createdAt),
      new Date(updatedAt)
    );
  }
}
