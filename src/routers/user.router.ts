import { Router } from "express";
import { userController } from "../controllers";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { CreateUserSchema } from "../schemas/user.schema";
import verifyEmail from "../middlewares/verifyEmail.middleware";
import verifyCPF from "../middlewares/verifyCPF.middleware";
import verifyUserId from "../middlewares/verifyUserId.middleware";
import validateHeaderToken from "../middlewares/validateToken.middleware";
import verifyAccountOwner from "../middlewares/verifyAccountOwner.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "",
  validateRequestBody(CreateUserSchema),
  verifyEmail,
  verifyCPF,
  userController.create
);

userRouter.delete(
  "/:id",
  validateHeaderToken,
  verifyAccountOwner,
  verifyUserId,
  userController.remove
);
