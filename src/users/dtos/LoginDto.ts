import { Nullable } from '@/shared/domain';
import { z } from 'zod';

const LoginDtoSchema = z.object({
  username: z.string().min(1, { message: 'Missing username' }),
  password: z.string().min(1, { message: 'Missing password' }),
});

export class LoginDto {
  private constructor(
    public readonly username: string,
    public readonly password: string
  ) {}

  static create(
    props: Record<string, any>
  ): [Nullable<String[]>, Nullable<LoginDto>] {
    const parsed = LoginDtoSchema.safeParse(props);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(issue => issue.message);
      return [errors, null];
    }

    const { username, password } = parsed.data;
    return [null, new LoginDto(username, password)];
  }
}
