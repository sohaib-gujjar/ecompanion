import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632145121706 implements MigrationInterface {
    name = 'init1632145121706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`user\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(254) NOT NULL, \`description\` text NOT NULL, \`password\` varchar(255) NOT NULL, \`imgId\` char(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_56af8860934cd4329439f991ec\` (\`imgId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`file\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`workspace\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`teams\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`workspaceId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`message\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`text\` varchar(255) NOT NULL, \`fileId\` char(36) NULL, \`userId\` char(36) NOT NULL, \`toUserId\` char(36) NULL, \`workspaceMessageId\` char(36) NULL, \`teamsMessageId\` char(36) NULL, UNIQUE INDEX \`REL_ce2da017b61bdb9fd01415a618\` (\`fileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`reaction\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`emojiId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`emoji\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`workspace_users_user\` (\`workspaceId\` char(36) NOT NULL, \`userId\` char(36) NOT NULL, INDEX \`IDX_e560bebe0dad802fbb036ba878\` (\`workspaceId\`), INDEX \`IDX_ff70af68685d8a5d6b588dfdc5\` (\`userId\`), PRIMARY KEY (\`workspaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e-companion\`.\`teams_users_user\` (\`teamsId\` char(36) NOT NULL, \`userId\` char(36) NOT NULL, INDEX \`IDX_87fc9fa5eb07beb301a3bd90f2\` (\`teamsId\`), INDEX \`IDX_f675843e42c3220d3c34bd81e1\` (\`userId\`), PRIMARY KEY (\`teamsId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`user\` ADD CONSTRAINT \`FK_56af8860934cd4329439f991ec8\` FOREIGN KEY (\`imgId\`) REFERENCES \`e-companion\`.\`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`teams\` ADD CONSTRAINT \`FK_3ca5ec3f5558bcfb54c76a1ef23\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`e-companion\`.\`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` ADD CONSTRAINT \`FK_ce2da017b61bdb9fd01415a618b\` FOREIGN KEY (\`fileId\`) REFERENCES \`e-companion\`.\`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` ADD CONSTRAINT \`FK_446251f8ceb2132af01b68eb593\` FOREIGN KEY (\`userId\`) REFERENCES \`e-companion\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` ADD CONSTRAINT \`FK_96789153e31e0bb7885ea13a279\` FOREIGN KEY (\`toUserId\`) REFERENCES \`e-companion\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` ADD CONSTRAINT \`FK_4e5d00ca51bb784edb0c2a4fbfc\` FOREIGN KEY (\`workspaceMessageId\`) REFERENCES \`e-companion\`.\`workspace\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` ADD CONSTRAINT \`FK_8500966cc0509036182d93e6fef\` FOREIGN KEY (\`teamsMessageId\`) REFERENCES \`e-companion\`.\`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`reaction\` ADD CONSTRAINT \`FK_04716a5b4b598329201a985e4ca\` FOREIGN KEY (\`emojiId\`) REFERENCES \`e-companion\`.\`emoji\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`workspace_users_user\` ADD CONSTRAINT \`FK_e560bebe0dad802fbb036ba8788\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`e-companion\`.\`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`workspace_users_user\` ADD CONSTRAINT \`FK_ff70af68685d8a5d6b588dfdc5b\` FOREIGN KEY (\`userId\`) REFERENCES \`e-companion\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`teams_users_user\` ADD CONSTRAINT \`FK_87fc9fa5eb07beb301a3bd90f2e\` FOREIGN KEY (\`teamsId\`) REFERENCES \`e-companion\`.\`teams\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`teams_users_user\` ADD CONSTRAINT \`FK_f675843e42c3220d3c34bd81e1d\` FOREIGN KEY (\`userId\`) REFERENCES \`e-companion\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`teams_users_user\` DROP FOREIGN KEY \`FK_f675843e42c3220d3c34bd81e1d\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`teams_users_user\` DROP FOREIGN KEY \`FK_87fc9fa5eb07beb301a3bd90f2e\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`workspace_users_user\` DROP FOREIGN KEY \`FK_ff70af68685d8a5d6b588dfdc5b\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`workspace_users_user\` DROP FOREIGN KEY \`FK_e560bebe0dad802fbb036ba8788\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`reaction\` DROP FOREIGN KEY \`FK_04716a5b4b598329201a985e4ca\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` DROP FOREIGN KEY \`FK_8500966cc0509036182d93e6fef\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` DROP FOREIGN KEY \`FK_4e5d00ca51bb784edb0c2a4fbfc\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` DROP FOREIGN KEY \`FK_96789153e31e0bb7885ea13a279\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` DROP FOREIGN KEY \`FK_446251f8ceb2132af01b68eb593\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`message\` DROP FOREIGN KEY \`FK_ce2da017b61bdb9fd01415a618b\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`teams\` DROP FOREIGN KEY \`FK_3ca5ec3f5558bcfb54c76a1ef23\``);
        await queryRunner.query(`ALTER TABLE \`e-companion\`.\`user\` DROP FOREIGN KEY \`FK_56af8860934cd4329439f991ec8\``);
        await queryRunner.query(`DROP INDEX \`IDX_f675843e42c3220d3c34bd81e1\` ON \`e-companion\`.\`teams_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_87fc9fa5eb07beb301a3bd90f2\` ON \`e-companion\`.\`teams_users_user\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`teams_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ff70af68685d8a5d6b588dfdc5\` ON \`e-companion\`.\`workspace_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e560bebe0dad802fbb036ba878\` ON \`e-companion\`.\`workspace_users_user\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`workspace_users_user\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`emoji\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`reaction\``);
        await queryRunner.query(`DROP INDEX \`REL_ce2da017b61bdb9fd01415a618\` ON \`e-companion\`.\`message\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`message\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`teams\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`workspace\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`file\``);
        await queryRunner.query(`DROP INDEX \`REL_56af8860934cd4329439f991ec\` ON \`e-companion\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`e-companion\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`e-companion\`.\`user\``);
    }

}
