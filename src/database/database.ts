import pg from 'pg';
import 'dotenv/config'

const { Pool } = pg;

const connection = new Pool({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'Doradoidona2332',
	database: 'mymangalist2.0' 
});

export { connection }