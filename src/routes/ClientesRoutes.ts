import { Router, Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService';

const router = Router();
const clienteService = new ClienteService();

router.get('/', async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAllClientes();
    res.json({
      success: true,
      data: clientes,
      total: clientes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar clientes',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const cliente = await clienteService.getClienteById(id);
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    res.json({
      success: true,
      data: cliente
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar cliente',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone } = req.body;
    const cliente = await clienteService.createCliente({ nome, email, telefone });
    
    res.status(201).json({
      success: true,
      message: 'Cliente criado com sucesso',
      data: cliente
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao criar cliente',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const { nome, email, telefone } = req.body;
    const cliente = await clienteService.updateCliente(id, { nome, email, telefone });
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Cliente atualizado com sucesso',
      data: cliente
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao atualizar cliente',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const deleted = await clienteService.deleteCliente(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Cliente deletado com sucesso'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao deletar cliente',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router;