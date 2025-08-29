import { Router } from 'express';

const router = Router();
console.log("rodando arquivo de rotas");





import {
  loginUsuario,
  
} from '../controllers/usuariosController';


/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         login:
 *           type: string
 *           example: "usuario@example.com"
 *         senha:
 *           type: string
 *           example: "senha-secreta"
 *       required:
 *         - login
 *         - senha
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Usuario'
 * 
 */


/**
 * @swagger
 * /users/Login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: Endpoint para realizar o login de um usuário existente
 *     tags: [Usuarios]
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   tokenValido:
 *                     type: boolean
 *                     example: true
 *       401:
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
 *                   example: "Credenciais inválidas"
 *       500:
 *         description: Erro ao fazer login
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
 *                   example: "Erro ao fazer login"
 */


router.post('/Login', loginUsuario);


export default router;