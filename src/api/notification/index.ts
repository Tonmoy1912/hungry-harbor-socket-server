import { Router } from "express";
import { sendNotification } from "../../controller/notification_controller";

const notificationRouter=Router();

notificationRouter.post("/send-notification",sendNotification);

export default notificationRouter;