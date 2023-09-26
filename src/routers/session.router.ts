import { Router } from "express";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { UserLoginSchema } from "../schemas/user.schema";
import { sessionController } from "../controllers";

export const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  validateRequestBody(UserLoginSchema),
  sessionController.login
);
