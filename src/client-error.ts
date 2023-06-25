import { StatusCodes } from "http-status-codes";

import GLOBAL from "./constants/global.constant";

export interface ClientErrorType {
  level?: string;
  message: string;
  name: string;
  status?: number | null;
  details?: unknown;
  originalError?: Error | null;
}

export interface ClientReturnedErrorType {
  name: string | null;
  message: string;
  details: unknown;
}

export default class ClientError extends Error implements ClientErrorType {
  level: string;
  message: string;
  name: string;
  status: number;
  details: unknown;
  originalError: Error | null;

  constructor(error: ClientErrorType) {
    super();

    this.name = error.name;
    this.message = error.message;
    this.level = error.level || GLOBAL.LOGGER.LOGGER_LEVEL.ERROR;
    this.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.details = error.details || null;
    this.originalError = error.originalError !== undefined ? error.originalError : null;
  }

  public getError(): ClientReturnedErrorType {
    return {
      name: this.name,
      message: this.message,
      details: this.details
    };
  }

  public getLogError(): string {
    let loggerMessageDetail;
    if (this.details) {
      loggerMessageDetail = `${JSON.stringify(this.details, null, "\t")}`;
    } else {
      if (
        this.originalError !== null &&
        "stack" in this.originalError &&
        this.originalError.stack === "string"
      ) {
        loggerMessageDetail = this.originalError.stack;
      } else {
        loggerMessageDetail = "";
      }
    }

    return `${this.name} - ${this.message} ${loggerMessageDetail}`;
  }
}
