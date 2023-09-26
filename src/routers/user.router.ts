import { Router } from "express";
import { userController } from "../controllers";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { CreateUserSchema } from "../schemas/user.schema";

export const userRouter: Router = Router();

userRouter.post(
  "",
  validateRequestBody(CreateUserSchema),
  userController.create
);
