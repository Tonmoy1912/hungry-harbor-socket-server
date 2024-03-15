import { Router } from "express";
import { acceptOrder, deliveredOrder, newOrder, readyOrder, userCancelOrder } from "../../controller/order_controller";

const orderRouer=Router();

orderRouer.post("/accept-order",acceptOrder);
orderRouer.post("/delivered",deliveredOrder);
orderRouer.post("/ready",readyOrder);
orderRouer.post("/user-cancel-order",userCancelOrder);
orderRouer.post("/new-order",newOrder);

export default orderRouer;