import { FindAndCountAllType } from "../definitions/global";
import { RatingCriteriaResult } from "../entities/rating-criteria-results.entity";

const findAll = async (): Promise<FindAndCountAllType<RatingCriteriaResult>> => {
  const found: [RatingCriteriaResult[], number] = await RatingCriteriaResult.findAndCount({
    relations: ["ratingGrid", "ratingCriteria"]
  });

  return { data: found[0], count: found[1] };
};

export default { findAll };
