import { Router } from "express";
import { announcementController } from "../controllers";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import {
  CreateAnnouncementSchema,
  UpdateAnnouncementSchema,
} from "../schemas/announcement.schema";
import validateHeaderToken from "../middlewares/validateToken.middleware";
import verifyAccountType from "../middlewares/verifyAccountType.middleware";
import verifyUserId from "../middlewares/verifyUserId.middleware";
import { updateAnnouncement } from "../services/announcement.service";

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
announcementRouter.get(
  "/user/:id",
  verifyUserId,
  announcementController.readByUser
);
announcementRouter.patch(
  "/:id",
  validateRequestBody(UpdateAnnouncementSchema),
  validateHeaderToken,
  announcementController.update
);
