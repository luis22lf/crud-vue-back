import { Request, Response } from 'express';
import pool from '../config/configs';
import { Equipamento, ApiResponse } from '../types';
import axios from 'axios'; // Adicionado para json-server

const JSON_SERVER_URL = "http://localhost:3001/equipamentos";



export const cadastrarEquipamento = async (req: Request, res: Response) => 
{
    const { nome, situacao } = req.body as Equipamento;

    // Validação básica
    if (!nome || !situacao) {
        const response: ApiResponse<null> = 
        {
        success: false,
        error: 'Nome e situação são obrigatórios.'
        };
        return res.status(400).json(response);
    }

    try 
    {
        let data: Equipamento;

        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = await pool.query('INSERT INTO equipamentos (nome, situacao) VALUES ($1, $2) RETURNING *',[nome, situacao]);
            data = result.rows[0];
        }
        //Acesso Json-server
        else
        {
            const response = await axios.post(JSON_SERVER_URL, { nome, situacao });
            console.log('Dados recebidos:', req.body);
            data = response.data // O json-server retorna o objeto criado diretamente
            
        }
        const retornoEndpoint: ApiResponse<Equipamento> = 
        {
            success: true,
            data: data
        };
        return res.status(201).json(retornoEndpoint);
        
    } catch (err) 
    {
        console.error(err);
        const response: ApiResponse<null> = 
        {
            success: false,
            error: 'Erro ao cadastrar equipamento'
        };
        return res.status(500).json(response);
    }
};



export const listarEquipamentos = async (req: Request, res: Response) => 
{
    try 
    {
        let data: Equipamento[];

        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = await pool.query('SELECT * FROM equipamentos ORDER BY id');
            data = result.rows
        }
        //Acesso json-server
        else
        {
            const response = await axios.get(JSON_SERVER_URL);
            data = response.data;
        }
        return res.status(200).json(data);
    } catch (err) 
    {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
    }
};



export const deletarEquipamento = async (req: Request, res: Response) => 
{
    const { id } = req.params;
  
    // Validação básica
    if (!id || isNaN(parseInt(id))) 
    {
        const response: ApiResponse<null> = 
        {
        success: false,
        error: 'ID inválido'
        };
        return res.status(400).json(response);
    }

    try 
    {
        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = await pool.query('DELETE FROM equipamentos WHERE id = $1 RETURNING *',[id]);
            
            if (result.rowCount === 0) {
            const response: ApiResponse<null> = 
            {
                success: false,
                error: 'Equipamento não encontrado'
            };
            return res.status(404).json(response);
            }
        }
        //Acesso json-server
        else
        {
            const response = await axios.delete(`${JSON_SERVER_URL}/${id}`);
        }
        const retornoEndpoint: ApiResponse<null> = 
        {
            success: true,
        };
            return res.status(204).json(retornoEndpoint);
    
    } catch (err) 
  {
    console.error(err);
    const response: ApiResponse<null> = 
    {
    success: false,
    error: 'Erro ao deletar equipamento'
    };
    return res.status(500).json(response);
  }
};



export const editarEquipamento = async (req: Request, res: Response) => 
{
  const { id } = req.params;
  const { nome, situacao } = req.body;

    try 
    {
        let data: Equipamento;
        
        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = await pool.query('UPDATE equipamentos SET nome = $1, situacao = $2 WHERE id = $3',[nome, situacao, id]);

            data = result.rows[0];
        }
        //Acesso json-server
        else 
        {
            const response = await axios.put(`${JSON_SERVER_URL}/${id}`, { nome, situacao });
            data = response.data;
        }
        const retornoEndpoint: ApiResponse<Equipamento> = 
        {
            success: true,
            data
        };
        return res.status(200).json(retornoEndpoint); // json-server retorna o objeto atualizado
        
    } catch (err) 
    {
        console.error(err);
        const response: ApiResponse<null> = 
        {
            success: false,
            error: 'Erro ao atualizar equipamento'
        };
        return res.status(500).json(response);
    }
};