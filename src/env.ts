import dotenv from "dotenv";

const envPath: string = process.env.NODE_ENV === "test" ? "./.env.test" : "./.env";

dotenv.config({
  path: envPath
});

const ENV = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: Number(process.env.PORT),
  HOST: process.env.HOST as string,

  API_KEY: process.env.API_KEY as string,

  DATABASE_HOST: process.env.DATABASE_HOST as string,
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  DATABASE_USERNAME: process.env.DATABASE_USERNAME as string,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,

  USER_PASSWORD: process.env.USER_PASSWORD as string,
  USER_BEARER_TOKEN: process.env.USER_BEARER_TOKEN as string,

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  ADMIN_BEARER_TOKEN: process.env.ADMIN_BEARER_TOKEN as string
};

for (const [key, value] of Object.entries(ENV)) {
  if (typeof value === "undefined" || value === "" || Number.isNaN(value)) {
    throw new Error(`Config error, undefined ENV: ${key}`);
  }
}

export default ENV;
