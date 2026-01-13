require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_EXPIRES: process.env.ACCESS_TOKEN_EXPIRE,
  REFRESH_EXPIRES: process.env.REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  CORS_WHITELIST: process.env.CORS_WHITELIST,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
