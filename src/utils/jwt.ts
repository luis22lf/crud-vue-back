

const jwt = require('jsonwebtoken');

export function gerarToken(id_usuario:string) {
  const jwtGerado = jwt.sign({id_usuario}, process.env.JWT_SECRET , { expiresIn: '1h' });
  return jwtGerado;
}



export function verificarToken(token:string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded)
    {
        console.log('Token válido:', decoded);
        return decoded;
    }
    else
    {
        throw new Error('Token inválido');
    }
  } catch (error) {
    console.error('Falha na verificação do token:', error);
  }
}
