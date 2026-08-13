import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { validateBody } from '../../../middlewares/validate.middleware';
import { CreateItemDto, UpdateItemDto } from '../../../dtos/item.dto';

const router = Router();
const itemController = new ItemController();

router.post('/', validateBody(CreateItemDto), itemController.create);
router.get('/', itemController.list);
router.get('/:id', itemController.getById);
router.patch('/:id', validateBody(UpdateItemDto), itemController.update);
router.delete('/:id', itemController.delete);

export default router;
