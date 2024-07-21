import { z } from 'zod';

import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { handleDtoValidation } from '@/shared/insfrastructure/utils';

const LoginDtoSchema = z.object({
  username: z.string().min(1, { message: 'Missing username' }),
  password: z.string().min(1, { message: 'Missing password' }),
});

export class LoginDto {
  private constructor(
    public readonly username: string,
    public readonly password: string
  ) {}

  static create(props: Record<string, any>): Nullable<LoginDto> {
    const parsed = LoginDtoSchema.safeParse(props);
    if (!parsed.success) {
      const errors = handleDtoValidation(parsed.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const { username, password } = parsed.data;
    return new LoginDto(username, password);
  }
}
