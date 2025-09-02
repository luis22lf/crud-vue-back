import pool from '../config/configs';


export const buscarSenhaPorEmail = async (email: string) => {
  const result = await pool.query('SELECT senha FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};