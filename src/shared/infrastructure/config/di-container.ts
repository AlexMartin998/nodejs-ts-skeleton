import { InjectionMode, createContainer } from 'awilix';

// imports-end

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    // models-end
  })
  .register({
    // services-end
  })
  .register({
    // controllers-end
  });

export { container as diContainer };
