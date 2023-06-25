import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1687640929990 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Seed criterias
      await queryRunner.query(
        "INSERT INTO rating_criteria(label) VALUES('FORM.RATING_CRITERIA.FIRST');"
      );
      await queryRunner.query(
        "INSERT INTO rating_criteria(label) VALUES('FORM.RATING_CRITERIA.SECOND');"
      );
      await queryRunner.query(
        "INSERT INTO rating_criteria(label) VALUES('FORM.RATING_CRITERIA.THIRD');"
      );
      await queryRunner.query(
        "INSERT INTO rating_criteria(label) VALUES('FORM.RATING_CRITERIA.FOURTH');"
      );

      // Seed team
      await queryRunner.query(
        "INSERT INTO rating_grid(label, icon1, icon2) VALUES('team1', 'sun', 'sun');"
      );
      await queryRunner.query(
        "INSERT INTO rating_grid(label, icon1, icon2) VALUES('team2', 'sun', 'sun');"
      );
      await queryRunner.query(
        "INSERT INTO rating_grid(label, icon1, icon2) VALUES('team3', 'sun', 'sun');"
      );
      await queryRunner.query(
        "INSERT INTO rating_grid(label, icon1, icon2) VALUES('team4', 'sun', 'sun');"
      );
      await queryRunner.query(
        "INSERT INTO rating_grid(label, icon1, icon2) VALUES('team5', 'sun', 'sun');"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async down(_queryRunner: QueryRunner): Promise<void> {}
}
