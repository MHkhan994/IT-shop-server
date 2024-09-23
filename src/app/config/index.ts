import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.join(process.cwd(), ".env")] });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api: process.env.CLOUD_API_KEY,
  cloud_secret: process.env.CLOUD_API_SECRET
};