import { DatabaseType } from "typeorm";

import { RatingGrid } from "../entities/rating-grids.entity";
import { RatingCriteria } from "../entities/rating-criterias.entity";
import { RatingCriteriaResult } from "../entities/rating-criteria-results.entity";

import { Seed1687640929990 } from "../migrations/1687640929990-seed";

import ENV from "../env";

const type: DatabaseType = "mysql";

export default {
  type,
  host: ENV.DATABASE_HOST,
  port: ENV.DATABASE_PORT,
  username: ENV.DATABASE_USERNAME,
  password: ENV.DATABASE_PASSWORD,
  database: ENV.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [RatingGrid, RatingCriteria, RatingCriteriaResult],
  subscribers: [],
  migrations: [Seed1687640929990]
};
