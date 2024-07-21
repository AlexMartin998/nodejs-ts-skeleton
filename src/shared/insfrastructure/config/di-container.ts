import { InjectionMode, asClass, asValue, createContainer } from 'awilix';

import { UserModel } from '@/users/models';
import { UsersServiceImpl } from '@/users/services';
import { UsersController } from '@/users/users.controller';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    // models
    userModel: asValue(UserModel),
  })
  .register({
    // services
    usersService: asClass(UsersServiceImpl),
  })
  .register({
    // controllers
    usersController: asClass(UsersController),
  });

export { container as diContainer };
