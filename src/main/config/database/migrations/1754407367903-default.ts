import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1754407367903 implements MigrationInterface {
  name = "Default1754407367903";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "text_analysis" ADD "toxicity" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "text_analysis" DROP COLUMN "toxicity"`,
    );
  }
}
