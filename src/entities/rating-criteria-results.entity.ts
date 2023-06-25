import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Column } from "typeorm";

import { RatingGrid } from "./rating-grids.entity";
import { RatingCriteria } from "./rating-criterias.entity";

@Entity()
export class RatingCriteriaResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => RatingGrid, (ratingGrid: RatingGrid) => ratingGrid.ratingCriteriaResults)
  ratingGrid: RatingGrid;

  @ManyToOne(
    () => RatingCriteria,
    (ratingCriteria: RatingCriteria) => ratingCriteria.ratingCriteriaResults
  )
  ratingCriteria: RatingCriteria;
}
