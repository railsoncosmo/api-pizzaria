import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/order/RemoveItemService';
import { AddItemController } from './AddItemController';

class RemoveItemController{
    async handle(req: Request, res: Response){
        
        const item_id = req.query.item_id as string;

        const removeItemService = new RemoveItemService();

        const order = await removeItemService.execute({
           item_id,
        })

        return res.json(order)

    }
}

export { RemoveItemController };