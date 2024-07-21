import { BadRequestError } from '@/shared/domain';
import { InternalServerError } from '@/shared/domain/errors/internal-server.error';
import { BcryptFacade, JwtFacade } from '@/shared/facades';
import { LoginDto, LoginResponseDto, RegisterUserDto } from '../dtos';
import { type UserModel } from '../models/user.model';
import { UsersService } from './users.service';

export class UsersServiceImpl implements UsersService {
  private baseGenPicUrl = 'https://avatar.iran.liara.run/public';

  constructor(private readonly userModel: typeof UserModel) {}

  async register(registerDto: RegisterUserDto): Promise<LoginResponseDto> {
    const userExists = await this.userExists(registerDto.username);
    if (userExists) throw new BadRequestError('User already exists');

    // save user

    const user = new this.userModel({
      ...registerDto,
      password: BcryptFacade.hash(registerDto.password),
      profilePic: this.calcImgUrl(registerDto.username, registerDto.gender),
    });
    await user.save();

    const token = await JwtFacade.generateToken({ id: user.id });
    if (!token) throw new InternalServerError('Error while creating JWT');

    return LoginResponseDto.create({
      accessToken: token,
      user: {
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      },
    });
  }

  login(loginDto: LoginDto): Promise<LoginResponseDto> {
    throw new Error('Method not implemented.');
  }

  renewToken(refreshToken: string): Promise<LoginResponseDto> {
    throw new Error('Method not implemented.');
  }

  async userExists(username: string): Promise<boolean> {
    return !!(await this.userModel.findOne({ username }));
  }

  private calcImgUrl(username: string, gender: string): string {
    const boyProfilePic = `${this.baseGenPicUrl}/boy?username=${username}`;
    const girlProfilePic = `${this.baseGenPicUrl}/girl?username=${username}`;

    return gender === 'male' ? boyProfilePic : girlProfilePic;
  }
}
