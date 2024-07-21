import { Request, Response } from 'express';

import { handleRestExceptions } from '@/shared/insfrastructure/server/utils';
import { RegisterUserDto } from './dtos';
import { UsersService } from './services';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async register(req: Request, res: Response) {
    try {
      const registerDto = RegisterUserDto.create(req.body);

      const loginResponseDto = await this.usersService.register(registerDto!);

      return res.status(201).json(loginResponseDto);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }
}
