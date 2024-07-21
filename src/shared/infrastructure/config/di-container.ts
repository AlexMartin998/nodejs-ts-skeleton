import { InjectionMode, asClass, asValue, createContainer } from 'awilix';

import { ConversationController } from '@/conversation/controllers';
import { ConversationModel } from '@/conversation/models';
import { ConversationServiceImpl } from '@/conversation/services';
import { MessageController } from '@/messages/controllers';
import { MessageModel } from '@/messages/models';
import { MessageServiceImpl } from '@/messages/services';
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
    messageModel: asValue(MessageModel),
    conversationModel: asValue(ConversationModel),
    // models-end
  })
  .register({
    // services
    usersService: asClass(UsersServiceImpl),
    messageService: asClass(MessageServiceImpl),
    conversationService: asClass(ConversationServiceImpl),
    // services-end
  })
  .register({
    // controllers
    usersController: asClass(UsersController),
    messageController: asClass(MessageController),
    conversationController: asClass(ConversationController),
    // controllers-end
  });

export { container as diContainer };
