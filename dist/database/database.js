import pg from 'pg';
//import dotenv from 'dotenv';
//dotenv.config();
var Pool = pg.Pool;
var connection = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Doradoidona2332',
    database: 'mymangalist2.0'
});
export { connection };
