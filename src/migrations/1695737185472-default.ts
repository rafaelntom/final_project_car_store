import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695737185472 implements MigrationInterface {
    name = 'Default1695737185472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "description" SET NOT NULL`);
    }

}
