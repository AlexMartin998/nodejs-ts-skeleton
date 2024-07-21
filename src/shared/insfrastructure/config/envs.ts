import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),

  JWT_SECRET: get('JWT_SECRET').required().asString(),

  // MONOGODB
  MONGODB_URI: get('MONGODB_URI').required().asString(),
  MONGODB_NAME: get('MONGODB_NAME').required().asString(),

};
