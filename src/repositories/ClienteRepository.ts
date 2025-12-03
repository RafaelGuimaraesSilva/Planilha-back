import { eq } from 'drizzle-orm';
import { db } from '../db';
import { clientes, Cliente, NewCliente } from '../db/schema';

export class ClienteRepository {
  
  // Buscar todos os clientes
  async findAll(): Promise<Cliente[]> {
    return await db.select().from(clientes).orderBy(clientes.id);
  }

  // Buscar cliente por ID
  async findById(id: number): Promise<Cliente | undefined> {
    const result = await db
      .select()
      .from(clientes)
      .where(eq(clientes.id, id))
      .limit(1);
    
    return result[0];
  }

  // Buscar cliente por email
  async findByEmail(email: string): Promise<Cliente | undefined> {
    const result = await db
      .select()
      .from(clientes)
      .where(eq(clientes.email, email))
      .limit(1);
    
    return result[0];
  }

  // Criar novo cliente
  async create(data: NewCliente): Promise<Cliente> {
    const result = await db
      .insert(clientes)
      .values(data)
      .returning();
    
    return result[0];
  }

    // Atualizar cliente
    async update(id: number, data: Partial<NewCliente>): Promise<Cliente | undefined> {
    const result = await db
      .update(clientes)
      .set(data)
      .where(eq(clientes.id, id))
      .returning();
    return result[0];
  }


  // Deletar cliente
  async delete(id: number): Promise<boolean> {
    const result = await db
      .delete(clientes)
      .where(eq(clientes.id, id))
      .returning();
    
    return result.length > 0;
  }
}