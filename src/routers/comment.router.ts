import { Router } from "express";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { CommentSchema, CreateCommentSchema } from "../schemas/comment.schema";
import { commentController } from "../controllers";
import validateHeaderToken from "../middlewares/validateToken.middleware";
import verifyCommentPermission from "../middlewares/verifyCommentPermission.middleware";
import commentRepository from "../repositories/comment.repository";
import verifyEditCommentPermission from "../middlewares/verifyEditCommentPermission.middleware";

export const commentRouter: Router = Router();

commentRouter.use(validateHeaderToken);
commentRouter.post(
  "/announcement/:id",
  validateRequestBody(CreateCommentSchema),
  commentController.create
);
commentRouter.get("/announcement/:id", commentController.read);
commentRouter.patch(
  "/:id",
  validateRequestBody(CreateCommentSchema),
  verifyEditCommentPermission,
  commentController.update
);
commentRouter.delete(
  "/:id",
  verifyCommentPermission,
  commentController.removeComment
);

//TODO Deletar rota ↓ - Apenas utilizada para verificar todos os comentarios
commentRouter.get("", async (req, res) => {
  const allComments = await commentRepository.find();

  return res.status(200).json(allComments);
});
