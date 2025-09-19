const jwt = require('jsonwebtoken');

export function gerarToken(id_usuario:string) {
  const jwtGerado = jwt.sign({id_usuario}, process.env.JWT_SECRET , { expiresIn: '15m' });
  return jwtGerado;
}

export function verificarToken(token:string) {
  try 
  {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
    if (decoded && decoded.id_usuario) //decodificou com sucesso e tem o id_usuario
    {
      console.log('Token válido:', decoded);
      console.log('ID do usuário no token:', decoded.id_usuario);
      return decoded;
    } else 
    {
      console.log('Estrutura do token:', JSON.stringify(decoded, null, 2));
      throw new Error('Token inválido: payload não contém id_usuario');
    }
  } catch (error) {
    // Verifica se o token expirou
    if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expirado no catch da verificação');
      throw new Error('Token expirado');
    }
    throw error;
  }
}




export function gerarRefreshToken(id_usuario:string) {
  console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);
  const refreshToken = jwt.sign(
    { id_usuario, tipo: 'refresh' }, 
    process.env.JWT_REFRESH_SECRET, // Use um segredo diferente
    { expiresIn: '4h' } // 4 horas
    );
    console.log('Refresh Token gerado:', refreshToken);
    console.log('ID do usuário no Refresh Token gerado:', refreshToken.id_usuario);
  return refreshToken;
}


// Verifica refresh token
export function verificarRefreshToken(refresh_token: string) {
  try 
  {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    
    // Verifica se é realmente um refresh token
    if (decoded.tipo !== 'refresh') 
    {
      throw new Error('Tipo de token inválido');
    }
    
    return decoded;
  } catch (error) 
  {
    console.error('Falha na verificação do refresh token:', error);
    throw new Error('Refresh token inválido ou expirado');
  }
}