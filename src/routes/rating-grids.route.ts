import { FastifyPluginOptions, FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import apiKeyMiddleware from "../middleware/api-key.middleware";
import authenticationMiddleware from "../middleware/authentication.middleware";
import RatingGridService from "../services/rating-grids.service";
import RatingGridResultService from "../services/rating-grid-results.service";
import { RatingGridResult } from "../definitions/models/rating-grids-results";
import { FastifyPluginDoneFunction } from "../definitions/global";

type PostRatingsRequest = FastifyRequest<{
  Params: { id: number };
  Body: RatingGridResult[];
}>;

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
      return res.status(StatusCodes.OK).send(await RatingGridService.findAll());
    }
  );

  instance.get(
    "/results",
    {
      preValidation: [apiKeyMiddleware, authenticationMiddleware()]
    },
    async (_req: FastifyRequest, res: FastifyReply): Promise<void> => {
      return res.status(StatusCodes.OK).send(await RatingGridResultService.findAll());
    }
  );

  instance.post(
    "/:id/ratings",
    {
      preValidation: [apiKeyMiddleware, authenticationMiddleware()]
    },
    async (req: PostRatingsRequest, res: FastifyReply): Promise<void> => {
      return res
        .status(StatusCodes.OK)
        .send(await RatingGridService.insertRatings(req.params.id, req.body));
    }
  );

  done();
};

export const autoPrefix = "/rating-grids";
