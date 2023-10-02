import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696273647995 implements MigrationInterface {
    name = 'Default1696273647995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "created_at" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "created_at"`);
    }

}
