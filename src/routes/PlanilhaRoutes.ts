import { Router, Request, Response } from 'express';
import planilhaService from '../services/PlanilhaService';

const router = Router();

router.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await planilhaService.listAll();
    res.json({
      success: true,
      data: items,
      total: items.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar itens da planilha',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

router.post('/items', async (req: Request, res: Response) => {
  try {
    const items = req.body.items;
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'items deve ser um array',
      });
    }

    const createdItems = await planilhaService.addMany(items);
    res.status(201).json({
      success: true,
      data: createdItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao adicionar itens à planilha',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

export default router;