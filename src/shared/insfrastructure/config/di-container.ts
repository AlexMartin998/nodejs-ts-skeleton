import { InjectionMode, createContainer } from 'awilix';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({});

export { container as diContainer };
