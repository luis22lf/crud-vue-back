import { Router } from 'express';

const router = Router();
console.log("rodando arquivo de rotas");

//para rodar json server precisa dar esse comando:
//npx json-server --watch db.json --port 3001

// Configuração do json-server (estou usando 3001 pois 3000 é do postgre)
const JSON_SERVER_URL = 'http://localhost:3001/equipamentos';



import {
  cadastrarEquipamento,
  listarEquipamentos,
  deletarEquipamento,
  editarEquipamento
} from '../controllers/equipamentos_controller';
import { verifyTokenMiddleware } from '../middleware/verifyToken';

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
 * 
 */

//------------------------------------------------



/**
 * @swagger
 * /equipamentos/Cadastro:
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Nome e situação são obrigatórios."
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
 *                   example: "Erro ao cadastrar equipamentos"
 */


router.post('/Cadastro', cadastrarEquipamento);


/**
 * @swagger
 * /equipamentos/Allaparelhos:
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


router.get('/Allaparelhos', listarEquipamentos);



/**
 * @swagger
 * /equipamentos/Deletar/{id}:
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

router.delete('/Deletar/:id', deletarEquipamento);


/**
 * @swagger
 * /equipamentos/Editar/{id}:
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

router.put('/Editar/:id', editarEquipamento);


export default router;