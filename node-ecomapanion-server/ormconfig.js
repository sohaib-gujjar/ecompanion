const SOURCE = process.env.ENVIRONMENT === 'production' ? 'dist' : 'src';

module.exports = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "e-companion", //Create database `e-companion`;
    entities: [`${SOURCE}/**/*.entity{.ts,.js}`],
    synchronize: false,
    dropSchema: false,
    logging: true,
    migrationsTableName: "migration_table",
    migrations: [
        "src/@base/migrations/*.ts"//`${SOURCE}/@base/migrations/*{.ts,.js}`
    ],
    cli: {
        entitiesDir: "src/modules/model",//"src/**/*.entity{.ts,.js}",
        migrationsDir: "src/@base/migrations",//`${SOURCE}/@base/migrations`,
    }
};