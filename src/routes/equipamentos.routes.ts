import { Router } from 'express';
import pool from '../config/db';
import { Equipamento, ApiResponse } from '../types';
import axios from 'axios'; // Adicionado para json-server

const router = Router();
console.log("rodando arquivo de rotas");

//para rodar json server precisa dar esse comando:
//npx json-server --watch db.json --port 3001

//json server fiz apenas para rota get

// Configuração do json-server (estou usando 3001 pois 3000 é do postgre)
const JSON_SERVER_URL = 'http://localhost:3001/equipamentos';

/**
 * @swagger
 * tags:
 *   name: Equipamentos
 *   description: Gerenciamento de equipamentos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipamento:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Equipamento-1"
 *         situacao:
 *           type: string
 *           example: "uso-exclusivo"
 *       required:
 *         - id
 *         - nome
 *         - situacao
 *     
 *     EquipamentoInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Aparelho-1"
 *         situacao:
 *           type: string
 *           example: "funcional"
 *       required:
 *         - nome
 *         - situacao
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Equipamento'
 *         error:
 *           type: string
 */

//------------------------------------------------



/**
 * @swagger
 * /Cadastro:
 *   post:
 *     summary: Cadastra um novo equipamento
 *     description: Endpoint para cadastrar um novo equipamento na tabela
 *     tags: [Equipamentos]
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipamentoInput'
 *     responses:
 *       201:
 *         description: Equipamento cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Ausência de parâmetros obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao cadastrar equipamentos"
 */


// Rota para cadastrar aparelho - POSTGRE
/*router.post('/Cadastro', async (req, res) => {
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
});*/


//Cadastro de aparelho - JSON-SERVER
router.post('/Cadastro', async (req, res) => {
    const { nome, situacao } = req.body;

    // Verificando se campos estão vazios
    if (!nome || !situacao) 
    {
      const response: ApiResponse<null> = 
      {
        success: false,
        error: 'Nome e situação são obrigatórios.'
      };
      return res.status(400).json(response);
    }

  try {
    const response = await axios.post(JSON_SERVER_URL, { nome, situacao });
    console.log('Dados recebidos:', req.body);

    const retornoEndpoint: ApiResponse<Equipamento> = {
      success: true,
      data: response.data // O json-server retorna o objeto criado diretamente
    };
    
    return res.status(201).json(retornoEndpoint);

    } catch (err) {
    console.error(err);
    
    const response: ApiResponse<null> = {
      success: false,
      error: 'Erro ao cadastrar equipamento'
    };
    return res.status(500).json(response);
  }
});


/**
 * @swagger
 * /Allaparelhos:
 *   get:
 *     summary: Retorna todos os equipamentos cadastrados
 *     description: Endpoint para listar todos os equipamentos existentes na tabela
 *     tags: [Equipamentos]
 *     responses:
 *       200:
 *         description: Lista de equipamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipamento'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar equipamentos"
 */


// Rota para buscar aparelhos - POSTGRE
/*router.get('/Allaparelhos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipamentos');
    console.log('result:', result.rows);
    return res.status(200).json(result.rows);//o retorno de result é um objeto que contém uma propriedade chamada rows, que é um array com os dados da tabela
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
});*/

//Rota para buscar aparelhos - JSON-SERVER (comentar quando não usar)
router.get('/Allaparelhos', async (req, res) => {
  try {
    // Usando json-server
    const response = await axios.get(JSON_SERVER_URL);
    return res.status(200).json(response.data);
    } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
});




/**
 * @swagger
 * /Deletar/{id}:
 *   delete:
 *     summary: Deleta equipamento
 *     description: Endpoint para deletar um equipamento existente na tabela
 *     tags: [Equipamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do equipamento a ser deletado
 *     responses:
 *       204:
 *         description: Deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *               required:
 *                 - success
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Erro ao deletar equipamento"
 *               required:
 *                 - success
 *                 - error
 */


// Rota para deletar aparelhos - Postgre
/*router.delete('/Deletar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM equipamentos WHERE id = $1', [id]);
    const response: ApiResponse<null> = {
      success: true,
      data: null,
    };
    return res.status(204).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar equipamentos' });
  }
});*/

//Rota para deletar aparelhos - JSON-SERVER (comentar quando não usar)
router.delete('/Deletar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(`${JSON_SERVER_URL}/${id}`);
    const retornoEndpoint: ApiResponse<null> = {
      success: true,
      data: null,
    };
    return res.status(204).json(retornoEndpoint);
    } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar equipamentos' });
  }
});

/**
 * @swagger
 * /Editar/{id}:
 *   put:
 *     summary: Edita equipamento
 *     description: Endpoint para editar um equipamento existente na tabela
 *     tags: [Equipamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do equipamento a ser editado
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipamentoInput'
 *     responses:
 *       200:
 *         description: Editado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Erro interno do servidor
 */

// Rota para editar aparelhos - POSTGRE
/*router.put('/Editar/:id', async (req, res) => {
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
});*/

//Rota para editar aparelhos - JSON-SERVER (comentar quando não usar)
router.put('/Editar/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, situacao } = req.body;
  try {
    const response = await axios.put(`${JSON_SERVER_URL}/${id}`, { nome, situacao });
    return res.status(204).json(response.data); // json-server retorna o objeto atualizado
    } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao editar equipamentos' });
  }
});

export default router;