import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import announcementRepository from "../repositories/announcement.repository";

const verifyAnnouncementOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const announcementId = Number(req.params.id);
  const currentUser = res.locals.decoded.sub;

  const foundAnnouncement = await announcementRepository.findOne({
    where: {
      id: announcementId,
    },
    relations: {
      user: true,
    },
  });

  if (!foundAnnouncement) {
    throw new AppError("Announcement not found", 404);
  }

  if (foundAnnouncement.user.id != currentUser) {
    throw new AppError("You are not authorized to perfom this action.", 403);
  }

  return next();
};

export default verifyAnnouncementOwner;
