import {MigrationInterface, QueryRunner} from "typeorm";

export class init1631480261222 implements MigrationInterface {
    name = 'init1631480261222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test\`.\`user\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`firstName\` varchar(255) NOT NULL, \`firstName2\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(254) NOT NULL, \`description\` text NOT NULL, \`password\` varchar(255) NOT NULL, \`imgId\` char(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_56af8860934cd4329439f991ec\` (\`imgId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`file\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` ADD CONSTRAINT \`FK_56af8860934cd4329439f991ec8\` FOREIGN KEY (\`imgId\`) REFERENCES \`test\`.\`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` DROP FOREIGN KEY \`FK_56af8860934cd4329439f991ec8\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`file\``);
        await queryRunner.query(`DROP INDEX \`REL_56af8860934cd4329439f991ec\` ON \`test\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`test\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user\``);
    }

}
