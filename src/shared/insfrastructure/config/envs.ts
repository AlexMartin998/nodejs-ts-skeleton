import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),

  // MongoDB
  MONGODB_URI: get('MONGODB_URI').required().asString(),
  MONGO_USERNAME: get('MONGO_USERNAME').required().asString(),
  MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
  MONGO_NAME: get('MONGO_NAME').required().asString(),

};
