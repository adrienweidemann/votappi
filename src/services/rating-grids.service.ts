import { FindAndCountAllType } from "../definitions/global";
import { RatingGrid } from "../entities/rating-grids.entity";
import { RatingCriteriaResult } from "../entities/rating-criteria-results.entity";
import { RatingGridResult } from "../definitions/models/rating-grids-results";

const findAll = async (): Promise<FindAndCountAllType<RatingGrid>> => {
  const found: [RatingGrid[], number] = await RatingGrid.findAndCount();

  return { data: found[0], count: found[1] };
};

const insertRatings = async (ratingGridId: number, ratings: RatingGridResult[]): Promise<void> => {
  try {
    for (const current of ratings) {
      await RatingCriteriaResult.insert({
        rating: current.rating,
        ratingGrid: { id: ratingGridId },
        ratingCriteria: { id: current.ratingCriteriaId }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default { findAll, insertRatings };
