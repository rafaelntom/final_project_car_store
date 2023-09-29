import { DeepPartial } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { AppError } from "../errors/errors";
import announcementRepository from "../repositories/announcement.repository";
import commentRepository from "../repositories/comment.repository";
import userRepository from "../repositories/user.repository";

export const createComment = async (
  userId: number,
  announcementId: number,
  descriptionData: string
) => {
  const foundUser = await userRepository.findOne({
    where: {
      id: 1,
    },
  });

  if (!foundUser) {
    throw new AppError("User not found!", 409);
  }

  const foundAnnouncement = await announcementRepository.findOne({
    where: {
      id: 3,
    },
  });

  if (!foundAnnouncement) {
    throw new AppError("Announcement not found, please check the id!", 409);
  }

  const newComment = new Comment();
  newComment.description = descriptionData;
  newComment.announcement = foundAnnouncement;
  newComment.user = foundUser;

  await commentRepository.save(newComment);

  return newComment;
};
