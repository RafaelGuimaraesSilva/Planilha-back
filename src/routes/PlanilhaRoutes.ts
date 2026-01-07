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
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Body deve ser um objeto com os campos do item'
      });
    }

    const createdItem = await planilhaService.addOne(payload);
    res.status(201).json({
      success: true,
      data: createdItem,
    });
  } catch (error) {
    const isClientError = error instanceof Error && /obrigat|inválid|deve ser um número/i.test(error.message);
    res.status(isClientError ? 400 : 500).json({
      success: false,
      message: isClientError ? (error instanceof Error ? error.message : 'Erro de validação') : 'Erro ao adicionar item à planilha',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

export default router;