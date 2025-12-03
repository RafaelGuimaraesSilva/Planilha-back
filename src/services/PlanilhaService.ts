import express from 'express';
import { PlanilhaService } from '../services/PlanilhaService';

const router = express.Router();
const service = new PlanilhaService();

router.get('/items', async (req, res) => {
  const items = await service.listAll();
  res.json(items);
});

router.post('/items', async (req, res) => {
  try {
    const items = req.body.items;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'items deve ser um array' });
    const created = await service.addMany(items);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro' });
  }
});

export default router;