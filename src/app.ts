import { envs } from './shared/infrastructure/config';
import { MongoDB } from './shared/infrastructure/persistence';
import { AppRouter } from './shared/infrastructure/server/router';
import { Server } from './shared/infrastructure/server/server';


const main = async () => {

  /* MongoDB */
  await MongoDB.connect({
    mongoUri: envs.MONGODB_URI,
    dbName: envs.MONGODB_NAME,
  });


  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    // public_path: envs.PUBLIC_PATH,
    router: AppRouter.routes,
  });


  server.start();

}



(async () => {
  main();
})();
