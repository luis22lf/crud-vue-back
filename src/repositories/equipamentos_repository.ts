import pool from '../config/configs';
import { Equipamento } from '../types';


export const cadastrarEquipamento = async (nome: string, situacao: string): Promise<Equipamento> => {
    const result = await pool.query('INSERT INTO equipamentos (nome, situacao) VALUES ($1, $2) RETURNING *',[nome, situacao]);
    return result.rows[0];
};


export const listarEquipamentos = async (): Promise<Equipamento[]> => {
    const result = await pool.query('SELECT * FROM equipamentos ORDER BY id');
    return result.rows;
};


export const deletarEquipamento = async (id: number): Promise<Equipamento | null> => {
    const result = await pool.query('DELETE FROM equipamentos WHERE id = $1 RETURNING *',[id]);
    return result.rows[0] || null;
};


export const editarEquipamento = async (id: number, nome: string, situacao: string): Promise<Equipamento> => {
    const result = await pool.query('UPDATE equipamentos SET nome = $1, situacao = $2 WHERE id = $3',[nome, situacao, id]);
    return result.rows[0];
};