import { InjectionMode, asClass, asValue, createContainer } from 'awilix';

import { UserModel } from '@/users/models';
import { UsersServiceImpl } from '@/users/services';
import { UsersController } from '@/users/users.controller';
// imports-end

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    // models
    userModel: asValue(UserModel),
    // models-end
  })
  .register({
    // services
    usersService: asClass(UsersServiceImpl),
    // services-end
  })
  .register({
    // controllers
    usersController: asClass(UsersController),
    // controllers-end
  });

export { container as diContainer };
