import { Router } from "express";
import { ItemUpdate } from "../../controller/items_controller";


const itemsRouter=Router();

itemsRouter.post("/item-update",ItemUpdate);

export default itemsRouter;