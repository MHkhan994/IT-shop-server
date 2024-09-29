import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.join(process.cwd(), ".env")] });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api: process.env.CLOUD_API_KEY,
  cloud_secret: process.env.CLOUD_API_SECRET,
  bcrypt_hash_rounds: process.env.BCRYPT_HASH_ROUNDS,
  access_secret: process.env.ACCESS_SECRET,
  refresh_secret: process.env.REFRESH_SECRET,
  node_environment: process.env.ENVIRONMENT,
  access_token_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  refresh_token_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
