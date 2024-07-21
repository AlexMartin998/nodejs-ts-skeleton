import { z } from 'zod';

import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { handleDtoValidation } from '@/shared/infrastructure/utils';

export const CreateConversationSchema = z.object({
  participants: z.array(z.string().min(1, { message: 'Missing participants' })),
  messages: z.array(z.string().min(1, { message: 'Missing messages' })),
});

export class CreateConversationDto {
  private constructor(
    public readonly participants: string[],
    public readonly messages: string[]
  ) {}

  static create(props: Record<string, any>): Nullable<CreateConversationDto> {
    const validationResult = CreateConversationSchema.safeParse(props);

    if (!validationResult.success) {
      const errors = handleDtoValidation(validationResult.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const { messages, participants } = validationResult.data;
    return new CreateConversationDto(participants, messages);
  }
}
