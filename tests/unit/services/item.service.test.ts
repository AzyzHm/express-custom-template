import { ItemService } from '../../../src/services/item.service';
import { ItemRepository } from '../../../src/repositories/item.repository';
import { NotFoundException } from '../../../src/exceptions/http-exceptions';
import { IItem } from '../../../src/models/item.model';

describe('ItemService (unit)', () => {
  let repository: jest.Mocked<ItemRepository>;
  let service: ItemService;

  const fakeItem = { _id: 'abc123', name: 'Widget', quantity: 5 } as unknown as IItem;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    } as unknown as jest.Mocked<ItemRepository>;

    service = new ItemService(repository);
  });

  it('creates an item via the repository', async () => {
    repository.create.mockResolvedValue(fakeItem);

    const result = await service.createItem({ name: 'Widget', quantity: 5 });

    expect(repository.create).toHaveBeenCalledWith({ name: 'Widget', quantity: 5 });
    expect(result).toEqual(fakeItem);
  });

  it('returns an item when found by id', async () => {
    repository.findById.mockResolvedValue(fakeItem);

    const result = await service.getItemById('abc123');

    expect(result).toEqual(fakeItem);
  });

  it('throws NotFoundException when item does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.getItemById('missing')).rejects.toThrow(NotFoundException);
  });

  it('throws NotFoundException when updating a missing item', async () => {
    repository.updateById.mockResolvedValue(null);

    await expect(service.updateItem('missing', { name: 'X' })).rejects.toThrow(NotFoundException);
  });

  it('throws NotFoundException when deleting a missing item', async () => {
    repository.deleteById.mockResolvedValue(null);

    await expect(service.deleteItem('missing')).rejects.toThrow(NotFoundException);
  });
});
