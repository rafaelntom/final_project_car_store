import { Router } from "express";
import { announcementController } from "../controllers";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { CreateAnnouncementSchema } from "../schemas/announcement.schema";
import validateHeaderToken from "../middlewares/validateToken.middleware";
import verifyAccountType from "../middlewares/verifyAccountType.middleware";

export const announcementRouter: Router = Router();

announcementRouter.post(
  "",
  validateHeaderToken,
  verifyAccountType,
  validateRequestBody(CreateAnnouncementSchema),
  announcementController.create
);

announcementRouter.get("", announcementController.readAll);
announcementRouter.get("/:id", announcementController.readById);
