import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { z } from 'zod';

const RegisterUserSchema = z
  .object({
    fullName: z.string().min(1, 'Missing fullName'),
    username: z.string().min(1, 'Missing username'),
    gender: z.string().min(1, 'Missing gender'),
    password: z.string().min(1, 'Missing password'),
    confirmPassword: z.string().min(1, 'Missing confirmPassword'),
  })
  .refine(data => ['male', 'female'].includes(data.gender), {
    message: 'Invalid gender',
    path: ['gender'],
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Esto indica que el error se asocia específicamente con el campo confirmPassword
  });

export class RegisterUserDto {
  private constructor(
    public readonly fullName: string,
    public readonly username: string,
    public readonly gender: string,
    public readonly password: string,
    public readonly confirmPassword: string
  ) {}

  static create(props: Record<string, any>): Nullable<RegisterUserDto> {
    const validationResult = RegisterUserSchema.safeParse(props);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(issue => issue.message);
      throw new InvalidArgumentError(errors);
    }

    const { fullName, username, password, gender, confirmPassword } =
      validationResult.data;
    return new RegisterUserDto(
      // importa el orden de los argumentos
      fullName,
      username,
      gender,
      password,
      confirmPassword
    );
  }
}
