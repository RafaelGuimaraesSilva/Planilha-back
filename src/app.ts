import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { testConnection } from './db';

// Importar as rotas

import planilhaRouter from './routes/PlanilhaRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🚀 API está funcionando com Drizzle ORM!',
    status: 'online',
    orm: 'Drizzle',
    endpoints: {
      clientes: '/api/clientes',
      health: '/health'
    }
  });
});

// Rota de health check
app.get('/health', async (req: Request, res: Response) => {
  try {
    const dbConnected = await testConnection();
    res.json({
      status: 'ok',
      database: dbConnected ? 'connected' : 'disconnected',
      orm: 'Drizzle',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});


app.use('/planilha', planilhaRouter);

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`🗃️  ORM: Drizzle`);
  
  // Testar conexão com banco
  await testConnection();
});



export default app;