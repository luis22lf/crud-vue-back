import { Router } from 'express';

const router = Router();
console.log("rodando arquivo de rotas");





import {
  loginUsuario,
  
} from '../controllers/usuariosController';





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


router.post('/Login', loginUsuario);


export default router;