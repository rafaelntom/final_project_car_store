import { Router } from "express";
import { userController } from "../controllers";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { CreateUserSchema } from "../schemas/user.schema";
import verifyEmail from "../middlewares/verifyEmail.middleware";
import verifyCPF from "../middlewares/verifyCPF.middleware";
import verifyUserId from "../middlewares/verifyUserId.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "",
  validateRequestBody(CreateUserSchema),
  verifyEmail,
  verifyCPF,
  userController.create
);

userRouter.delete("/:id", verifyUserId, userController.remove);
