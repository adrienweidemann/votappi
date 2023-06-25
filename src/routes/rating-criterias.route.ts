import { FastifyPluginOptions, FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import apiKeyMiddleware from "../middleware/api-key.middleware";
import { FastifyPluginDoneFunction } from "../definitions/global";
import authenticationMiddleware from "../middleware/authentication.middleware";
import RatingCriteriaService from "../services/rating-criterias.service";

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  instance.get(
    "/",
    {
      preValidation: [apiKeyMiddleware, authenticationMiddleware()]
    },
    async (_req: FastifyRequest, res: FastifyReply): Promise<void> => {
      return res.status(StatusCodes.OK).send(await RatingCriteriaService.findAll());
    }
  );

  done();
};

export const autoPrefix = "/rating-criterias";
