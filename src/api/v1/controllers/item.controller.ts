import { NextFunction, Request, Response } from 'express';
import { ItemService } from '../../../services/item.service';

/**
 * Controller layer: translates HTTP requests into service calls
 * and formats responses. No business logic lives here.
 */
export class ItemController {
  constructor(private readonly itemService: ItemService = new ItemService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await this.itemService.createItem(req.body);
      res.status(201).json({ status: 'success', data: item });
    } catch (err) {
      next(err);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await this.itemService.listItems();
      res.status(200).json({ status: 'success', data: items });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await this.itemService.getItemById(req.params.id);
      res.status(200).json({ status: 'success', data: item });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await this.itemService.updateItem(req.params.id, req.body);
      res.status(200).json({ status: 'success', data: item });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.itemService.deleteItem(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
