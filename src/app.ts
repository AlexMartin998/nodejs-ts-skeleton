import { envs } from './config';
import { MongoDB } from './shared/insfrastructure/persistence';
import { AppRouter } from './shared/insfrastructure/server/router';
import { Server } from './shared/insfrastructure/server/server';


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
