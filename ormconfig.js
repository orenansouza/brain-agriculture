require('dotenv').config()

const ormconfig = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/*.js"],
  migrations: ["src/migrations/*.js"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations"
  },
  synchronize: true,
  logging: false
}

module.exports = ormconfig