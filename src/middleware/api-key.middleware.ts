import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { StatusCodes } from "http-status-codes";

import ClientError from "../client-error";
import GLOBAL from "../constants/global.constant";
import ERROR from "../constants/error.constant";
import ENV from "../env";

export default (req: FastifyRequest, _reply: FastifyReply, next: HookHandlerDoneFunction): void => {
  if (!req.user && req.headers[GLOBAL.API_KEY.HEADER_KEY_NAME] !== ENV.API_KEY) {
    next(
      new ClientError({
        name: ERROR.NAME.API_KEY,
        level: GLOBAL.LOGGER.LOGGER_LEVEL.WARN,
        status: StatusCodes.UNAUTHORIZED,
        message: ERROR.API_KEY.BAD_KEY
      })
    );
  } else {
    next();
  }
};
