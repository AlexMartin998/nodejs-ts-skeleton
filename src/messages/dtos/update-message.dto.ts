import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { handleDtoValidation } from '@/shared/infrastructure/utils';
import { CreateMessageSchema } from './create-message.dto';

// make optional all CreateMessageSchema fields
const UpdMessageSchema = CreateMessageSchema.partial();

export class UpdMessageDto {
  private constructor(
    public readonly sender?: string,
    public readonly receiver?: string,
    public readonly message?: string
  ) {}

  static create(props: Record<string, any>): Nullable<UpdMessageDto> {
    const validationResult = UpdMessageSchema.safeParse(props);

    if (!validationResult.success) {
      const errors = handleDtoValidation(validationResult.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const { sender, receiver, message } = validationResult.data;
    return new UpdMessageDto(sender, receiver, message);
  }
}
