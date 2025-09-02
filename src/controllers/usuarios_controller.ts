import { Request, Response } from 'express';
import pool from '../config/configs';
import { verificarToken, gerarToken } from '../utils/jwt';
import * as usuariosRepo from '../repositories/usuarios_repository';


export const loginUsuario = async (req: Request, res: Response) => 
{
    const { login, senha } = req.body;
    const bcrypt = require('bcrypt');
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

    //const hashedPassword = await bcrypt.hash(senha, saltRounds);
    try 
    {
        const result = await usuariosRepo.buscarSenhaPorEmail(login);
        console.log('result', result);
        const senhaCorreta = await bcrypt.compare(senha, result.senha);
        console.log('senhaCorreta?', senhaCorreta);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerando token a partir do id do usuário
        const token = gerarToken(result.id);
        // Retornando verificação do token
        const tokenValido = verificarToken(token);
        return res.status(200).json({ message: 'Login bem-sucedido', token, tokenValido });//retornar o token
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};


