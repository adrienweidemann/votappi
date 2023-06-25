import "reflect-metadata";
import { DataSource } from "typeorm";

import App from "./app";
import ClientError from "./client-error";
import GLOBAL from "./constants/global.constant";
import ERROR from "./constants/error.constant";
import dataSource from "./configs/typeorm.config";
import ENV from "./env";

const init = async (): Promise<void> => {
  try {
    const ds = new DataSource(dataSource);
    await ds.initialize();
    await ds.synchronize();
    await ds.runMigrations();
  } catch (err) {
    console.error("%j", err);

    const error: Error = err as Error;
    throw new ClientError({
      level: GLOBAL.LOGGER.LOGGER_LEVEL.ERROR,
      message: ERROR.SERVER_START.FAILED,
      name: ERROR.NAME.SERVER_START,
      details: `${error.name} : ${error.message}
       ${error.stack || ""}`
    });
  }

  await app.listen();
};

const app: App = new App(ENV.PORT, ENV.HOST);

init().catch((err: Error) => {
  console.log(`${err.name} : ${err.message}
      ${err.stack || ""}`);
  process.exit(1);
});
