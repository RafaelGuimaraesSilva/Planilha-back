import { ClienteRepository } from '../repositories/ClienteRepository';
import { Cliente, CreateClienteDTO, UpdateClienteDTO } from '../models/Cliente';

export class ClienteService {
  private clienteRepository: ClienteRepository;

  constructor() {
    this.clienteRepository = new ClienteRepository();
  }

  async getAllClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.findAll();
  }

  async getClienteById(id: number): Promise<Cliente | undefined> {
    if (id <= 0) {
      throw new Error('ID inválido');
    }
    return await this.clienteRepository.findById(id);
  }

  async createCliente(data: CreateClienteDTO): Promise<Cliente> {
    // Validações
    if (!data.nome || data.nome.trim() === '') {
      throw new Error('Nome é obrigatório');
    }
    if (!data.email || data.email.trim() === '') {
      throw new Error('Email é obrigatório');
    }

    // Verificar se email já existe
    const existingCliente = await this.clienteRepository.findByEmail(data.email);
    if (existingCliente) {
      throw new Error('Email já cadastrado');
    }

    // Criar e retornar o cliente
    const cliente = await this.clienteRepository.create(data);
    return cliente;
  }

  async updateCliente(id: number, data: UpdateClienteDTO): Promise<Cliente | undefined> {
    if (id <= 0) {
      throw new Error('ID inválido');
    }

    // Verificar se cliente existe
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    // Se está atualizando email, verificar se já existe
    if (data.email && data.email !== cliente.email) {
      const existingCliente = await this.clienteRepository.findByEmail(data.email);
      if (existingCliente) {
        throw new Error('Email já cadastrado');
      }
    }

    // Atualizar e retornar o cliente
    const updatedCliente = await this.clienteRepository.update(id, data);
    return updatedCliente;
  }

  async deleteCliente(id: number): Promise<boolean> {
    if (id <= 0) {
      throw new Error('ID inválido');
    }

    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const deleted = await this.clienteRepository.delete(id);
    return deleted;
  }
}