import { FastifyPluginOptions, FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import apiKeyMiddleware from "../middleware/api-key.middleware";
import UserService from "../services/users.service";
import { FastifyPluginDoneFunction } from "../definitions/global";

type PostLoginRequest = FastifyRequest<{
  Body: { username: string; password: string };
}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  instance.post(
    "/login",
    {
      preValidation: [apiKeyMiddleware]
    },
    async (req: PostLoginRequest, res: FastifyReply): Promise<void> => {
      return res.status(StatusCodes.OK).send(
        UserService.login({
          username: req.body.username,
          password: req.body.password
        })
      );
    }
  );

  instance.post(
    "/admin-login",
    {
      preValidation: [apiKeyMiddleware]
    },
    async (req: PostLoginRequest, res: FastifyReply): Promise<void> => {
      return res.status(StatusCodes.OK).send(
        UserService.adminLogin({
          username: req.body.username,
          password: req.body.password
        })
      );
    }
  );

  done();
};

export const autoPrefix = "/users";
