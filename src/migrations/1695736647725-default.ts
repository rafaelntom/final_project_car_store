import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695736647725 implements MigrationInterface {
    name = 'Default1695736647725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "account_type" TO "is_seller"`);
        await queryRunner.query(`ALTER TYPE "public"."users_account_type_enum" RENAME TO "users_is_seller_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_seller"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_seller" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_seller"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_seller" "public"."users_is_seller_enum" NOT NULL DEFAULT 'Comprador'`);
        await queryRunner.query(`ALTER TYPE "public"."users_is_seller_enum" RENAME TO "users_account_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "is_seller" TO "account_type"`);
    }

}
