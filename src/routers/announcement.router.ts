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
import verifyAccountOwner from "../middlewares/verifyAccountOwner.middleware";
import verifyAnnouncementOwner from "../middlewares/verifyAnnouncementOwner.middleware";

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
  validateHeaderToken,
  validateRequestBody(UpdateAnnouncementSchema),
  verifyAccountOwner,
  announcementController.update
);

announcementRouter.delete(
  "/:id",
  validateHeaderToken,
  verifyAnnouncementOwner,
  verifyAccountType,
  announcementController.remove
);
