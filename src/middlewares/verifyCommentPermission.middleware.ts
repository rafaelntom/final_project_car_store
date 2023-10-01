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

  console.log(res.locals.decoded);

  let foundComment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
      announcement: true,
    },
  });

  if (!foundComment)
    throw new AppError("Comment not found, please check the id!", 404);

  const announcementId = foundComment.announcement.id;

  let foundAnnouncement = await announcementRepository.findOne({
    where: {
      id: announcementId,
    },
    relations: {
      user: true,
    },
  });

  console.log(foundAnnouncement);
  console.log(
    `Announcement owner ${foundAnnouncement?.user.id}, current user ${currentUserId}`
  );

  const announcementOwnerId = foundAnnouncement?.user.id;

  let parsedComment = CommentSchema.parse(foundComment);
  const foundCommentUserId = parsedComment.user.id;

  if (Number(currentUserId) === Number(announcementOwnerId)) {
    return next();
  }

  if (currentUserId != foundCommentUserId) {
    throw new AppError("You're not the comment owner!", 403);
  }

  return next();
};

export default verifyCommentPermission;
