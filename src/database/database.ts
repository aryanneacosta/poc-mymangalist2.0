import pg from 'pg';
import 'dotenv/config'

const { Pool } = pg;

const connection = new Pool({
	host: 'your_host_name',
	port: 5555,
	user: 'postgres_user',
	password: 'postgres_password',
	database: 'database_name' 
});

export { connection }
