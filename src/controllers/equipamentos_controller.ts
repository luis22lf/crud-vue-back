import { Request, Response } from 'express';
import pool from '../config/configs';
import { Equipamento, ApiResponse } from '../types';
import axios from 'axios'; // Adicionado para json-server
import { verificarToken } from '../utils/jwt';
import * as equipamentosRepo from '../repositories/equipamentos_repository';

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

    let tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    //comando split quebra o token ao encontrar delimitador ' ' e salva em um array
    //cada elemento do array é uma parte do header, indice 0 é o tipo(Bearer) e indice 1 é o token
    tokenHeader = tokenHeader.split(' ')[1];
    console.log('Authorization Header:', tokenHeader);

    // Verificação do token
    if (!verificarToken(tokenHeader)) {
        return res.status(403).json({ error: 'Token inválido' });
    }

    try 
    {
        let data: Equipamento;

        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = await equipamentosRepo.cadastrarEquipamento(nome, situacao);
            data = result;
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

    let tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    //comando split quebra o token ao encontrar delimitador ' ' e salva em um array
    //cada elemento do array é uma parte do header, indice 0 é o tipo(Bearer) e indice 1 é o token
    tokenHeader = tokenHeader.split(' ')[1];
    console.log('Authorization Header:', tokenHeader);

    // Verificação do token
    if (!verificarToken(tokenHeader)) {
        return res.status(403).json({ error: 'Token inválido' });
    }

    try 
    {
        let data: Equipamento[];

        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = await equipamentosRepo.listarEquipamentos();
            data = result;
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

    let tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    //comando split quebra o token ao encontrar delimitador ' ' e salva em um array
    //cada elemento do array é uma parte do header, indice 0 é o tipo(Bearer) e indice 1 é o token
    tokenHeader = tokenHeader.split(' ')[1];
    console.log('Authorization Header:', tokenHeader);

    // Verificação do token
    if (!verificarToken(tokenHeader)) {
        return res.status(403).json({ error: 'Token inválido' });
    }

    try 
    {
        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = equipamentosRepo.deletarEquipamento(parseInt(id));
            
            if (!result) 
            {
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

  let tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    //comando split quebra o token ao encontrar delimitador ' ' e salva em um array
    //cada elemento do array é uma parte do header, indice 0 é o tipo(Bearer) e indice 1 é o token
    tokenHeader = tokenHeader.split(' ')[1];
    console.log('Authorization Header:', tokenHeader);

    // Verificação do token
    if (!verificarToken(tokenHeader)) {
        return res.status(403).json({ error: 'Token inválido' });
    }

    try 
    {
        let data: Equipamento;
        
        //Acesso postgre
        if (process.env.DB_TYPE == 'postgre')
        {
            // Acesso direto ao banco de dados
            const result = await equipamentosRepo.editarEquipamento(parseInt(id), nome, situacao);
            data = result;
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