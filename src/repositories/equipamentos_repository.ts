//import pool from '../config/dbconfigs';
import { Equipamento } from '../types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const cadastrarEquipamento = async (nome: string, situacao: string): Promise<Equipamento> => {
    const result = await prisma.equipamentos.create({
        data: {
            nome,
            situacao,
        },
    });
    return result;
};

/*export const cadastrarEquipamento = async (nome: string, situacao: string): Promise<Equipamento> => {
    const result = await pool.query('INSERT INTO equipamentos (nome, situacao) VALUES ($1, $2) RETURNING *',[nome, situacao]);
    return result.rows[0];
};*/

export const listarEquipamentos = async (): Promise<Equipamento[]> => {
    const result = await prisma.equipamentos.findMany({
        orderBy: {
            id: 'asc',
        },
    });
    return result;
};
/*
export const listarEquipamentos = async (): Promise<Equipamento[]> => {
    const result = await pool.query('SELECT * FROM equipamentos ORDER BY id');
    return result.rows;
};*/


export const deletarEquipamento = async (id: number): Promise<Equipamento | null> => {
    const result = await prisma.equipamentos.delete({
        where: {
            id: id
        }
    });
    return result || null;
};

/*export const deletarEquipamento = async (id: number): Promise<Equipamento | null> => {
    const result = await pool.query('DELETE FROM equipamentos WHERE id = $1 RETURNING *',[id]);
    return result.rows[0] || null;
};*/


export const editarEquipamento = async (id: number, nome: string, situacao: string): Promise<Equipamento> =>{
	const result = await prisma.equipamentos.update({
		where: {
			id: id
		},
		data: {
			nome: nome,
			situacao: situacao
		}
	});
	return result;
};

/*export const editarEquipamento = async (id: number, nome: string, situacao: string): Promise<Equipamento> => {
    const result = await pool.query('UPDATE equipamentos SET nome = $1, situacao = $2 WHERE id = $3',[nome, situacao, id]);
    return result.rows[0];
};*/