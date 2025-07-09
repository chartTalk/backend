import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV,
  FLASK_INFER_URL: process.env.FLASK_INFER_URL,
};
