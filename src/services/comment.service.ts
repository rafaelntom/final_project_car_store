import { DeepPartial } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { AppError } from "../errors/errors";
import announcementRepository from "../repositories/announcement.repository";
import commentRepository from "../repositories/comment.repository";
import userRepository from "../repositories/user.repository";
import {
  CommentAnnouncementReturnSchema,
  CommentSchema,
} from "../schemas/comment.schema";

const createComment = async (
  userId: number,
  announcementId: number,
  descriptionData: string
) => {
  const foundUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!foundUser) {
    throw new AppError("User not found!", 404);
  }

  const foundAnnouncement = await announcementRepository.findOne({
    where: {
      id: announcementId,
    },
  });

  if (!foundAnnouncement) {
    throw new AppError("Announcement not found, please check the id!", 404);
  }

  const newComment = new Comment();
  newComment.description = descriptionData;
  newComment.announcement = foundAnnouncement;
  newComment.user = foundUser;

  await commentRepository.save(newComment);

  return CommentSchema.parse(newComment);
};

const listAnnouncementComments = async (announcementId: number) => {
  const foundAnnouncement = await announcementRepository
    .createQueryBuilder("announcement")
    .leftJoinAndSelect("announcement.comments", "comment")
    .leftJoinAndSelect("comment.user", "user")
    .where("announcement.id = :id", { id: announcementId })
    .getOne();

  if (!foundAnnouncement) {
    throw new AppError("Announcement not found, please check the id!", 404);
  }

  return CommentAnnouncementReturnSchema.parse(foundAnnouncement);
};

const deleteComment = async (commentId: number) => {
  const foundComment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
  });

  if (!foundComment) {
    throw new AppError("Comment not found, please check the id provided!", 404);
  }

  await commentRepository.remove(foundComment);
};

const updateComment = async (commentId: number, payload: any) => {
  const foundComment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
  });

  const updatedComment = await commentRepository.save({
    ...foundComment,
    ...payload,
  });

  return updatedComment;
};

export {
  createComment,
  listAnnouncementComments,
  deleteComment,
  updateComment,
};
