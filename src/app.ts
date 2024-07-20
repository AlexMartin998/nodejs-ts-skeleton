import { envs } from './config';
import { AppRouter } from './shared/insfrastructure/server/router';
import { Server } from './shared/insfrastructure/server/server';


(async () => {
  main();
})();


function main() {

  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    // public_path: envs.PUBLIC_PATH,
    router: AppRouter.routes,
  });


  server.start();

}
