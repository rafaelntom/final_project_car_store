import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import announcementRepository from "../repositories/announcement.repository";
import commentRepository from "../repositories/comment.repository";
import { CommentSchema } from "../schemas/comment.schema";

const verifyCommentPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUserId = res.locals.decoded.sub;
  const currentUserAccountType = res.locals.decoded.is_seller;

  const commentId = Number(req.params.id);

  let foundComment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
    },
  });

  if (!foundComment)
    throw new AppError("Comment not found, please check the id!", 409);

  let parsedComment = CommentSchema.parse(foundComment);

  const foundCommentUserId = parsedComment.user.id;

  if (!currentUserAccountType && currentUserId != foundCommentUserId) {
    throw new AppError("You're not the comment owner!", 403);
  }
  return next();
};

export default verifyCommentPermission;
