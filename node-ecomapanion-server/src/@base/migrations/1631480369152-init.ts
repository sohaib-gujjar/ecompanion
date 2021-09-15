import {MigrationInterface, QueryRunner} from "typeorm";

export class init1631480369152 implements MigrationInterface {
    name = 'init1631480369152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` DROP COLUMN \`firstName2\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` ADD \`firstName2\` varchar(255) NOT NULL`);
    }

}
