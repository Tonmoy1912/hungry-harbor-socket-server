import { Router } from "express";
import { acceptOrder, deliveredOrder, readyOrder, userCancelOrder } from "../../controller/order_controller";

const orderRouer=Router();

orderRouer.post("/accept-order",acceptOrder);
orderRouer.post("/delivered",deliveredOrder);
orderRouer.post("/ready",readyOrder);
orderRouer.post("/user-cancel-order",userCancelOrder);

export default orderRouer;