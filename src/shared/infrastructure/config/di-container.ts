import { InjectionMode, asClass, asValue, createContainer } from 'awilix';

import { UserModel } from '@/users/models';
import { UsersServiceImpl } from '@/users/services';
import { UsersController } from '@/users/users.controller';
import { MessageController } from '@/messages/controllers';
import { MessageServiceImpl } from '@/messages/services';
import { MessageModel } from '@/messages/models';
// imports-end

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    // models
    userModel: asValue(UserModel),
    messageModel: asValue(MessageModel),
    // models-end
  })
  .register({
    // services
    usersService: asClass(UsersServiceImpl),
    messageService: asClass(MessageServiceImpl),
    // services-end
  })
  .register({
    // controllers
    usersController: asClass(UsersController),
    messageController: asClass(MessageController),
    // controllers-end
  });

export { container as diContainer };
