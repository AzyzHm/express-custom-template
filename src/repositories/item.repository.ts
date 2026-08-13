import { FilterQuery } from 'mongoose';
import { IItem, ItemModel } from '../models/item.model';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';

/**
 * Repository layer: the only place that talks to Mongoose directly.
 * Services depend on this abstraction rather than the ORM model.
 */
export class ItemRepository {
  async create(data: CreateItemDto): Promise<IItem> {
    return ItemModel.create(data);
  }

  async findAll(filter: FilterQuery<IItem> = {}): Promise<IItem[]> {
    return ItemModel.find(filter).exec();
  }

  async findById(id: string): Promise<IItem | null> {
    return ItemModel.findById(id).exec();
  }

  async updateById(id: string, data: UpdateItemDto): Promise<IItem | null> {
    return ItemModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async deleteById(id: string): Promise<IItem | null> {
    return ItemModel.findByIdAndDelete(id).exec();
  }
}
