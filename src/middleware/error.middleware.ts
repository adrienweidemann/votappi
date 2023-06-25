import { StatusCodes } from "http-status-codes";
import { FastifyRequest, FastifyReply, FastifyError } from "fastify";
import { Level } from "pino";

import ClientError, { ClientErrorType } from "../client-error";
import GLOBAL from "../constants/global.constant";
import ERROR from "../constants/error.constant";

export default (err: Error | ClientErrorType, req: FastifyRequest, reply: FastifyReply): void => {
  const level: string =
    "level" in err && typeof err.level === "string" ? err.level : GLOBAL.LOGGER.LOGGER_LEVEL.ERROR;
  let status: number = StatusCodes.INTERNAL_SERVER_ERROR;

  // Handle findOneOrFail from TypeORM
  if (err.name === "EntityNotFound" || err.name === "EntityNotFoundError") {
    status = StatusCodes.NOT_FOUND;
  } else if ("status" in err && typeof err.status === "number") {
    status = err.status;
  }

  let details: unknown;

  if ("details" in err && typeof err.details !== "undefined") {
    details = err.details;
  } else {
    details = null;
  }

  if (
    err instanceof Error &&
    err.stack !== undefined &&
    err.stack.includes(GLOBAL.VALIDATION.STACK_KEYWORD_CHECK)
  ) {
    // if it's a AJV validation error, keep the original message as details
    details = err.message;
    err.message = ERROR.NAME.VALIDATION;
    status = StatusCodes.BAD_REQUEST;
  }

  const originalError: Error | null = err instanceof ClientError ? null : (err as Error);

  const error: ClientError = new ClientError({
    name: err.name,
    message: err.message,
    level,
    status,
    details,
    originalError
  });

  req.log[level as Level](error.getLogError());

  try {
    void reply.status(error.status).send({ error: error.getError() });
  } catch (e) {
    // handle exceptions on reply.send (ex: ERR_HTTP_HEADERS_SENT if headers were sent already)
    const fastifyError = e as FastifyError;

    const error: ClientError = new ClientError({
      name: ERROR.NAME.ERROR_MIDDLEWARE,
      message: ERROR.ERROR_MIDDLEWARE.FAILED_TO_SEND_REPLY,
      level: GLOBAL.LOGGER.LOGGER_LEVEL.WARN,
      details: `On route: ${req.url}, ${fastifyError.message}`
    });

    req.log[level as Level](error.getLogError());
  }
};
