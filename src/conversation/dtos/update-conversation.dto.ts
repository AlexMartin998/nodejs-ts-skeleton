import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { handleDtoValidation } from '@/shared/infrastructure/utils';
import { CreateConversationSchema } from './create-conversation.dto';

const UpdConversationSchema = CreateConversationSchema.partial();

export class UpdConversationDto {
  private constructor(
    public readonly participants?: string[],
    public readonly messages?: string[]
  ) {}

  static create(props: Record<string, any>): Nullable<UpdConversationDto> {
    const validationResult = UpdConversationSchema.safeParse(props);

    if (!validationResult.success) {
      const errors = handleDtoValidation(validationResult.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const { messages, participants } = validationResult.data;
    return new UpdConversationDto(participants, messages);
  }
}
