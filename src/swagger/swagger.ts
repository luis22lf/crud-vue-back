import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const app = express();

// Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Crud Brengatech',
      version: '1.0.0',
      description: 'Documentação da minha API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: [path.join(__dirname,'../routes/*.ts')], // Caminho para seus arquivos de rotas
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ... suas outras rotas e configurações

app.listen(3002, () => {
  console.log('Servidor swagger rodando na porta 3002');
  console.log('Acesse a documentação em http://localhost:3002/api-docs');
});