import { Router } from 'express';
import pool from '../config/db';
import { Equipamento, ApiResponse } from '../types';

const router = Router();

// Rota para cadastrar aparelho
router.post('/Cadastro', async (req, res) => {
  const { nome, situacao } = req.body as Equipamento;

  console.log('Dados recebidos:', req.body);
  
  if (!nome || !situacao) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Nome e situação são obrigatórios.'
    };
    return res.status(400).json(response);
  }

  try {
    const result = await pool.query(
      'INSERT INTO equipamentos (nome, situacao) VALUES ($1, $2) RETURNING *',
      [nome, situacao]
    );
    
    const response: ApiResponse<Equipamento> = {
      success: true,
      data: result.rows[0]
    };
    return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Erro ao cadastrar equipamento'
    };
    return res.status(500).json(response);
  }
});

// Rota para buscar aparelhos
router.get('/Allaparelhos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipamentos');
    console.log('result:', result.rows);
    return res.status(200).json(result.rows);//o retorno de result é um objeto que contém uma propriedade chamada rows, que é um array com os dados da tabela
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
});


// Rota para deletar aparelhos
router.delete('/Deletar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM equipamentos WHERE id = $1', [id]);
    console.log('result:', result.rows);
    return res.status(204).json(result.rows);//o retorno de result é um objeto que contém uma propriedade chamada rows, que é um array com os dados da tabela
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
});



// Rota para editar aparelhos
router.put('/Editar/:id', async (req, res) => {
  console.log('req.body:', req.body);
  const { id } = req.params;
  const { nome, situacao } = req.body;
  try {
    const result = await pool.query('UPDATE equipamentos SET nome = $1, situacao = $2 WHERE id = $3', [nome,situacao,id]);
    return res.status(200).json(result.rows);//o retorno de result é um objeto que contém uma propriedade chamada rows, que é um array com os dados da tabela
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao editar equipamento' });
  }
});

export default router;