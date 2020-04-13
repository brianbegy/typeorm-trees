import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1586816253496 implements MigrationInterface {
    name = 'InitialTables1586816253496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" text, "managerId" uuid, "title" text, "mpath" character varying DEFAULT '', CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_86989cce48037671fa5e73cd389" FOREIGN KEY ("managerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_86989cce48037671fa5e73cd389"`, undefined);
        await queryRunner.query(`DROP TABLE "person"`, undefined);
    }

}
