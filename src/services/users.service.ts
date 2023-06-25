import { StatusCodes } from "http-status-codes";

import GLOBAL from "../constants/global.constant";
import ERROR from "../constants/error.constant";
import ClientError from "../client-error";
import ENV from "../env";
import { AuthenticatedUser } from "../definitions/models/user";
import { USER } from "../configs/models.config";

const login = (credentials: { username: string; password: string }): AuthenticatedUser => {
  if (credentials.password === ENV.USER_PASSWORD) {
    return {
      id: Math.floor(Math.random() * 1000000),
      name: "votapp",
      token: ENV.USER_BEARER_TOKEN,
      role: USER.ROLE.USER
    };
  }

  throw new ClientError({
    status: StatusCodes.UNAUTHORIZED,
    name: ERROR.NAME.SERVICE,
    message: ERROR.SERVICE.LOGIN,
    level: GLOBAL.LOGGER.LOGGER_LEVEL.WARN
  });
};

const adminLogin = (credentials: { username: string; password: string }): AuthenticatedUser => {
  if (credentials.password === ENV.ADMIN_PASSWORD) {
    return {
      id: Math.floor(Math.random() * 1000000),
      name: "votapp",
      token: ENV.ADMIN_BEARER_TOKEN,
      role: USER.ROLE.ADMIN
    };
  }

  throw new ClientError({
    status: StatusCodes.UNAUTHORIZED,
    name: ERROR.NAME.SERVICE,
    message: ERROR.SERVICE.LOGIN,
    level: GLOBAL.LOGGER.LOGGER_LEVEL.WARN
  });
};

export default {
  login,
  adminLogin
};
