import express from 'express';
import cors from 'cors';
import equipamentosRouter from './routes/equipamentos_route';
import usuariosRouter from './routes/usuarios_route'
import { verifyTokenMiddleware } from './middleware/verifyToken';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/equipamentos',verifyTokenMiddleware, equipamentosRouter);

app.use('/api/users', usuariosRouter);

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

console.log("Aplicação Express configurada com TypeScript");

export default app;



/*
Minha explicação do código:

app.ts 
  cria uma aplicação com express
  possibilita agrupar endpoint por rotas

routes/equipamentos.routes.ts
  endpoints do CRUD
  foi usado routes() ao invés de express(). 
  express() cria um servidor completo, routes() cria um mini servidor (sistema de roteamento isolado) dentro de express
  Ele permite que você organize rotas em módulos separados
  Não inicia um servidor sozinho, mas pode ser "montado" (app.use()) em um aplicativo principal. Por isso existe um arquivo app

server.ts
  pega a aplicação criada e escuta o que acontece em determinada porta

package-json
  adicionado "dev": "ts-node src/server.ts", e "build": "tsc"
  o dev, quando usado npm run dev vai rodar o arquivo srver.ts dentro de src

types/index.ts
  tipagem das variaveis usadas, é importado esse arquivo onde será usado as variaveis para não precisar tipar lá

config/db.ts
  configurações do banco de dados

-------------------------------------------------------

Comandos npm:

1- npm init -y
*Cria um novo arquivo package.json com valores padrão
*npm init inicia um novo projeto Node.js
*A flag -y (yes) aceita todas as configurações padrão sem perguntar

2- npm install express cors pg

3- npm install --save-dev @types/express @types/cors @types/pg
*Instala as definições de tipo TypeScript para as bibliotecas instaladas
*--save-dev: Salva como dependência de desenvolvimento
*@types/...: Pacotes com definições de tipo para TypeScript

4- npm install typescript ts-node @types/node @types/express @types/cors @types/pg --save-dev
*Instala ferramentas de desenvolvimento para TypeScript
*typescript: O compilador TypeScript
*ts-node: Permite executar TypeScript diretamente sem compilar
*@types/node: Definições de tipo para Node.js

5- npx tsc --init
*Cria um arquivo de configuração TypeScript (tsconfig.json)
*npx executa o pacote localmente
*tsc é o compilador TypeScript
*--init gera um arquivo de configuração padrão

*/