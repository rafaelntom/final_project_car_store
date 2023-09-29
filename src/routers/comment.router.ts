import { Router } from "express";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { createCommentSchema } from "../schemas/comment.schema";
import { commentController } from "../controllers";

export const commentRouter: Router = Router();

commentRouter.post(
  "",
  validateRequestBody(createCommentSchema),
  commentController.create
);
