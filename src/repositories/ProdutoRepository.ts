import { eq } from 'drizzle-orm';
import { db } from '../db';
import { produtos, Produto, NewProduto } from '../db/schema';

export class ProdutoRepository {
  
    async insert(data: NewProduto): Promise<Produto> {
    const result = await db
      .insert(produtos)
      .values(data)
      .returning();
    return result[0];
  }

  async deleteProduto(id: number): Promise<void> {
    await db
      .delete(produtos)
      .where(eq(produtos.id, id));
  };

}


