import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

import { RatingCriteriaResult } from "./rating-criteria-results.entity";

@Entity()
export class RatingGrid extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  icon1: string;

  @Column()
  icon2: string;

  @OneToMany(
    () => RatingCriteriaResult,
    (ratingCriteriaResult: RatingCriteriaResult) => ratingCriteriaResult.ratingGrid
  )
  ratingCriteriaResults: RatingCriteriaResult[];
}
