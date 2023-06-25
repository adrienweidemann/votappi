import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

import { RatingCriteriaResult } from "./rating-criteria-results.entity";

@Entity()
export class RatingCriteria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToMany(
    () => RatingCriteriaResult,
    (ratingCriteriaResult: RatingCriteriaResult) => ratingCriteriaResult.ratingCriteria
  )
  ratingCriteriaResults: RatingCriteriaResult[];
}
