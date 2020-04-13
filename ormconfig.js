module.exports = {
  name: "default",
  type: "postgres",
  replication: {
    master: {
      host: "localhost",
      port: 15432,
      username: "root",
      password: "example",
      database: "ormtest",
      schema: "typeorm_test"
    },
    slaves: [],
  },
  logging: true,
  module: "commonjs",
  entities: ["./entities/**/*.ts"],
  migrations: ["./migrations/*.ts"],
  seeds: ["./seeds/**/*.seed.ts"],
  cli: { migrationsDir: "migrations", entitiesDir: "entities" }
};