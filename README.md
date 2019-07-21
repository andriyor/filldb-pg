# filldb-pg

Automatically generate data and fill your database tables with test data. 

filldb-pg will try to guess the format of data required based on column names and will generate 
random names, dates, emails, addresses and more to fill your PostgreSQL database with data.

### Example of usage

```javascript
const {Pool} = require("pg");
const fillDB = require('./index');

const pool = new Pool();
const usersTable = `CREATE TABLE IF NOT EXISTS
                       users
                   (
                       id         SERIAL PRIMARY KEY,
                       email      VARCHAR      NOT NULL UNIQUE,
                       first_name VARCHAR(128) NOT NULL,
                       last_name  VARCHAR(128) NOT NULL
                   )`;

fillDB.fillFake(pool, usersTable, 5);
pool.end();
```
As result

| id |email                           |first_name |last_name   |
|----|--------------------------------|-----------|------------|
| 1 | Jeffery30@yahoo.com            | Arvilla   | Yost       |
| 2 | Lyda.Smith2@yahoo.com          | Willard   | Kunze      |
| 3 | Wayne.Erdman@yahoo.com         | Guadalupe | Dare       |
| 4 | Arno.Macejkovic58@hotmail.com  | Cynthia   | Hahn       |
| 5 | Helene_Bergstrom10@yahoo.com   | Adelia    | Buckridge  |
