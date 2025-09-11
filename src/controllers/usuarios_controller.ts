import { Request, Response } from 'express';
import * as jwtFunction from '../utils/jwt';
import * as usuariosRepo from '../repositories/usuarios_repository';


export const loginUsuario = async (req: Request, res: Response) => 
{
    const { login, senha } = req.body;
    const bcrypt = require('bcrypt');
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

    //const hashedPassword = await bcrypt.hash(senha, saltRounds);
    try 
    {
        const result = await usuariosRepo.buscarIdESenhaPorEmail(login);
        console.log('result', result);
        const senhaCorreta = await bcrypt.compare(senha, result.senha);
        console.log('senhaCorreta?', senhaCorreta);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerando token a partir do id do usuário
        //console.log('ID do usuário para gerar token:', result);
        const token = jwtFunction.gerarToken(result.id);
        // Retornando verificação do token
        const tokenValido = jwtFunction.verificarToken(token);
        // Gerando refreshToken a partir do id do usuário
        const refreshToken = jwtFunction.gerarRefreshToken(result.id);
        // Retornando verificação do refreshToken
        const refreshTokenValido = jwtFunction.verificarRefreshToken(refreshToken);
        return res.status(200).json({ message: 'Login bem-sucedido', token, tokenValido, refreshToken, refreshTokenValido });//retornar o token
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};


export const renovarToken = async (req: Request, res: Response) => 
{
    let refreshTokenHeader = req.headers.authorization;

    //verificação se o token foi enviado
    if (!refreshTokenHeader) {
        return res.status(401).json({ error: 'RefreshToken não fornecido' });
    }

    refreshTokenHeader = refreshTokenHeader.split(' ')[1];

    //verificação se o token é válido
    try
    {
        // Verificação do token - se falhar, vai para o catch
        jwtFunction.verificarRefreshToken(refreshTokenHeader);
    }
    catch(error)
    {
        console.log('Erro detectado em renovarToken:', error);
        // Se o erro for de token expirado
        if (error == 'Error: RefreshToken expirado') {
            console.log('RefreshToken expirado detectado no catch do controller');
            return res.status(401).json({ error: 'RefreshToken expirado' });
        }
        // Para outros erros de token
        console.log('Token inválido detectado no catch do controller');
        return res.status(401).json({ error: 'RefreshToken inválido' });
    }

    try
    {
        const id_usuario = (jwtFunction.verificarRefreshToken(refreshTokenHeader) as { id_usuario: string }).id_usuario;
        console.log('ID do usuário extraído do refresh token:', id_usuario);
        // Gerando novo token a partir do id do usuário
        const novoToken = jwtFunction.gerarToken(id_usuario);
        return res.status(200).json({ message: 'Novo token gerado com sucesso',token: novoToken });//retornar o token
    }
    catch(error)
    {
        return res.status(401).json({ error: 'Falha ao gerar novo token' });
    }
    
}