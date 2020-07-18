import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAddStoreProducts1595108499423 implements MigrationInterface {
    name = 'fixAddStoreProducts1595108499423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store_products" ("storeId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_75b14851f78acb3265007ea3749" PRIMARY KEY ("storeId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d4c7d45afdd5e17611ee80cc77" ON "store_products" ("storeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f1e0ae4098735afa060ce6fb2" ON "store_products" ("productId") `);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "FK_d4c7d45afdd5e17611ee80cc774" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "FK_8f1e0ae4098735afa060ce6fb27" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_products" DROP CONSTRAINT "FK_8f1e0ae4098735afa060ce6fb27"`);
        await queryRunner.query(`ALTER TABLE "store_products" DROP CONSTRAINT "FK_d4c7d45afdd5e17611ee80cc774"`);
        await queryRunner.query(`DROP INDEX "IDX_8f1e0ae4098735afa060ce6fb2"`);
        await queryRunner.query(`DROP INDEX "IDX_d4c7d45afdd5e17611ee80cc77"`);
        await queryRunner.query(`DROP TABLE "store_products"`);
    }

}
