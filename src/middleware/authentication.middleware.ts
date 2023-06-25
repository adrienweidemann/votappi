import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { StatusCodes } from "http-status-codes";

import ClientError from "../client-error";
import GLOBAL from "../constants/global.constant";
import ERROR from "../constants/error.constant";
import ENV from "../env";

export default (required: boolean = true) => {
  return (req: FastifyRequest, _reply: FastifyReply, next: HookHandlerDoneFunction): void => {
    if (req.headers["authorization"]) {
      try {
        const token = req.headers["authorization"];
        if (
          token === `Bearer ${ENV.USER_BEARER_TOKEN}` ||
          token === `Bearer ${ENV.ADMIN_BEARER_TOKEN}`
        ) {
          next();
        } else {
          throw new Error("Incorrect auth token");
        }
      } catch (err) {
        next(
          new ClientError({
            name: ERROR.NAME.AUTHENTICATION,
            level: GLOBAL.LOGGER.LOGGER_LEVEL.INFO,
            status: StatusCodes.UNAUTHORIZED,
            message: ERROR.AUTHENTICATION.UNAUTHORIZED
          })
        );
      }
    } else {
      next(
        required
          ? new ClientError({
              name: ERROR.NAME.AUTHENTICATION,
              level: GLOBAL.LOGGER.LOGGER_LEVEL.INFO,
              status: StatusCodes.UNAUTHORIZED,
              message: ERROR.AUTHENTICATION.UNAUTHORIZED
            })
          : void 0
      );
    }
  };
};
