import { FindAndCountAllType } from "../definitions/global";
import { RatingCriteria } from "../entities/rating-criterias.entity";

const findAll = async (): Promise<FindAndCountAllType<RatingCriteria>> => {
  const found: [RatingCriteria[], number] = await RatingCriteria.findAndCount();

  return { data: found[0], count: found[1] };
};

export default { findAll };
