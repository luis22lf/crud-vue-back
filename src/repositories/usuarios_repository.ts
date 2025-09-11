import pool from '../config/configs';


export const buscarIdESenhaPorEmail = async (email: string) => {
  const result = await pool.query('SELECT id, senha FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};