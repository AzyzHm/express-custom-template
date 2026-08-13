import { IItem } from '../models/item.model';
import { ItemRepository } from '../repositories/item.repository';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';
import { NotFoundException } from '../exceptions/http-exceptions';

/**
 * Service layer: business logic sits here, above the repository.
 * Controllers call services; services never touch Mongoose directly.
 */
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository = new ItemRepository()) {}

  async createItem(data: CreateItemDto): Promise<IItem> {
    return this.itemRepository.create(data);
  }

  async listItems(): Promise<IItem[]> {
    return this.itemRepository.findAll();
  }

  async getItemById(id: string): Promise<IItem> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  async updateItem(id: string, data: UpdateItemDto): Promise<IItem> {
    const updated = await this.itemRepository.updateById(id, data);
    if (!updated) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return updated;
  }

  async deleteItem(id: string): Promise<void> {
    const deleted = await this.itemRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
  }
}
