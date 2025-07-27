import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'brengadb',
  password: 'adminluis',
  port: 5432,
});

export default pool;