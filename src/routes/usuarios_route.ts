import { Router } from 'express';

const router = Router();
console.log("rodando arquivo de rotas");





import {
  loginUsuario,
  renovarToken,
} from '../controllers/usuarios_controller';


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


/**
 * @swagger
 * /users/RenovarToken:
 *   post:
 *     summary: Renova o token de um usuário
 *     description: Endpoint para renovar o token de um usuário existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <refresh_token>"
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Novo token gerado com sucesso"
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Erro de autenticação - Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               tokenExpirado:
 *                 summary: RefreshToken expirado
 *                 value:
 *                   error: "RefreshTokenToken expirado"
 *               tokenInvalido:
 *                 summary: Token inválido
 *                 value:
 *                   error: "Token inválido"
 *               falhaGerarToken:
 *                 summary: Falha ao gerar novo token
 *                 value:
 *                   error: "Falha ao gerar novo token"
 *               refreshTokenNaoFornecido:
 *                 summary: RefreshToken não fornecido
 *                 value:
 *                   error: "RefreshToken não fornecido"
 */
router.post('/RenovarToken', renovarToken);

export default router;