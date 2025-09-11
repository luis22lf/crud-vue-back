import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utils/jwt';

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
    console.log('req no middleware:', req);
    console.log('Entrou no middleware de verificação de token');
    let tokenHeader = req.headers.authorization;
    console.log('Authorization Header no middleware:', tokenHeader);

    tokenHeader = tokenHeader?.split(' ')[1];

    //verificação se o token foi enviado
    if (!tokenHeader) 
    {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    try
    {
        // Verificação do token - se falhar, vai para o catch
        verificarToken(tokenHeader);
        next(); // Se o token for válido, continua para o próximo middleware ou rota
    }
    catch(error)
    {
        console.log('Erro dessa buceta:', error);
        // Se o erro for de token expirado
        if (error == 'Error: Token expirado') {
            console.log('Token expirado detectado no catch do controller');
            return res.status(401).json({ error: 'Token expirado' });
        }
        // Para outros erros de token
        console.log('Token inválido detectado no catch do controller');
        return res.status(401).json({ error: 'Token inválido' });
    }
}