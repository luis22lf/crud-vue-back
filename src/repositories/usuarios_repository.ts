//import pool from '../config/dbconfigs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const buscarIdESenhaPorEmail = async (email: string): Promise<{ id: string; senha: string } | null> => {
  const result = await prisma.usuarios.findUnique({
    where: { email: email },
    select: { id: true, senha: true }
  });
  return result || null;
};

/*export const buscarIdESenhaPorEmail = async (email: string): Promise<{ id: number; senha: string } | null> => {
  const result = await pool.query('SELECT id, senha FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};*/