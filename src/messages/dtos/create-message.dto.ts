import { z } from 'zod';

import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { ValidatorsFacade } from '@/shared/facades';
import { handleDtoValidation } from '@/shared/infrastructure/utils';

export const CreateMessageSchema = z.object({
  sender: z
    .string()
    .min(1, { message: 'Missing sender' })
    .refine(data => ValidatorsFacade.isMongoID(data), {
      message: 'Invalid sender ID',
    }),
  receiver: z
    .string()
    .min(1, { message: 'Missing receiver' })
    .refine(data => ValidatorsFacade.isMongoID(data), {
      message: 'Invalid receiver ID',
    }),
  message: z.string().min(1, { message: 'Missing message' }).max(500, {
    message: 'Message too long',
  }),
});

export class CreateMessageDto {
  private constructor(
    public readonly sender: string,
    public readonly receiver: string,
    public readonly message: string
  ) {}

  static create(props: Record<string, any>): Nullable<CreateMessageDto> {
    const validationResult = CreateMessageSchema.safeParse(props);

    if (!validationResult.success) {
      const errors = handleDtoValidation(validationResult.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const { sender, receiver, message } = validationResult.data;
    return new CreateMessageDto(sender, receiver, message);
  }
}
