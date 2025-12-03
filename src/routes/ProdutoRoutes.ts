import { Router, Request, Response } from 'express';
import { ProdutoService } from '../services/ProdutoService';

const router = Router();
const produtoService = new ProdutoService();

router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const produto = await produtoService.createProduto(data);
        res.status(201).json({
            success: true,
            data: produto
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Erro ao criar produto',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }   
});