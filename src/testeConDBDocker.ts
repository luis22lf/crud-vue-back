// test-db.ts
import dotenv from 'dotenv';
dotenv.config();

import pool from './config/dbconfigs';

async function test() {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado ao banco!');
    const result = await client.query('SELECT current_database(), current_user');
    console.log('Banco:', result.rows[0].current_database);
    console.log('Usuário:', result.rows[0].current_user);
    client.release();
  } catch (error) {
    console.error('❌ Erro:', error);
  }
  process.exit();
}

test();


//COMANDOS DOCKER

//docker-compose up -d                                        // Inicia os containers em segundo plano

//docker-compose down                                         // Para e remove os containers
//rmdir /s /q postgres-data                                   // Remove os dados do volume do PostgreSQL

//docker exec -it meu-postgres psql -U postgres -d brengadb2  // Acessa o banco de dados brengadb2
//\dt                                                         // Lista as tabelas do banco de dados
//SELECT * FROM tabela_exemplo;                               // Executa uma consulta SQL
//\q                                                          // Sai do psql