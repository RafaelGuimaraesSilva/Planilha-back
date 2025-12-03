
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { produtos, Produto, NewProduto } from '../db/schema';

export class ProdutoService {
  private produtoRepository: ProdutoRepository;
    constructor() {
    this.produtoRepository = new ProdutoRepository();
    }
    async createProduto(data: NewProduto): Promise<Produto> {
    // Validações
    if (!data.nome || data.nome.trim() === '') {
        throw new Error('Nome é obrigatório');
    }
    if (!data.preco || data.preco.trim() === '') {
        throw new Error('Preço é obrigatório');
    }
    // Criar e retornar o produto
    const produto = await this.produtoRepository.insert(data);
    return produto;
  };
}