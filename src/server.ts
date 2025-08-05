require('dotenv').config();
import app from './app';


const port = Number(process.env.SV_PORT);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});