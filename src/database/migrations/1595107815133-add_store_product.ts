import {MigrationInterface, QueryRunner} from "typeorm";

export class addStoreProduct1595107815133 implements MigrationInterface {
    name = 'addStoreProduct1595107815133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "productName" character varying(50) NOT NULL, "description" character varying NOT NULL, "productImg" character varying NOT NULL, "category" character varying NOT NULL, "price" double precision NOT NULL, "promo" character varying NOT NULL, "stars" double precision NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "storeName" character varying(50) NOT NULL, "description" character varying NOT NULL, "schedule" character varying(110) NOT NULL, "profile" character varying NOT NULL, "stars" double precision NOT NULL, "deliveryHours" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "store_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_98a52595c9031d60f5c8d280ca4" UNIQUE ("store_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_98a52595c9031d60f5c8d280ca4" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_98a52595c9031d60f5c8d280ca4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_98a52595c9031d60f5c8d280ca4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "store_id"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
