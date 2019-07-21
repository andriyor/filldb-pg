const {Pool} = require("pg");
const fillDB = require('./index');

const config = {
    user: "postgres", //this is the db user credential
    database: "faker",
    password: "18091997",
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};
const pool = new Pool(config);
const usersTable = `CREATE TABLE IF NOT EXISTS
                       users
                   (
                       id         SERIAL PRIMARY KEY,
                       email      VARCHAR      NOT NULL UNIQUE,
                       first_name VARCHAR(128) NOT NULL,
                       last_name  VARCHAR(128) NOT NULL
                   )`;

fillDB.fillFake(pool, usersTable, 10);
pool.end();
