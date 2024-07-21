import { LoginDto, LoginResponseDto, RegisterUserDto } from '../dtos';

export interface UsersService {
  register(user: RegisterUserDto): Promise<LoginResponseDto>;

  login(user: LoginDto): Promise<LoginResponseDto>;

  renewToken(refreshToken: string): Promise<LoginResponseDto>;

  userExists(username: string): Promise<boolean>;
}
