import { Server } from '../src/presentation/server';
import { envs } from '../src/shared/infrastructure/config';

// // vamos a mocker todo el Server | tb util para mockear librerias externas (react)
jest.mock('../src/presentation/server.ts');



describe('[App]: Test suit', () => {

  it('it should work', async () => {
    await import('../src/app');

    expect(Server).toHaveReturnedTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      router: expect.any(Function)
    });

    expect(Server.prototype.start).toHaveBeenCalledWith();
  });

});
