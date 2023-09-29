import { Router } from "express";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { CreateCommentSchema } from "../schemas/comment.schema";
import { commentController } from "../controllers";
import validateHeaderToken from "../middlewares/validateToken.middleware";

export const commentRouter: Router = Router();

commentRouter.use(validateHeaderToken);

commentRouter.post(
  "/announcement/:id",
  validateRequestBody(CreateCommentSchema),
  commentController.create
);

commentRouter.get("/announcement/:id", commentController.read);
