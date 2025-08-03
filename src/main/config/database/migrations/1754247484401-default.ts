import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1754247484401 implements MigrationInterface {
  name = "Default1754247484401";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "text_analysis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "sentiment" character varying NOT NULL, "frequent_words" text array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d96a3bf4a0e7a8c3c302c68f1ca" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "text_analysis"`);
  }
}
