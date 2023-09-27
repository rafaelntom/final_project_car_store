import { AppError } from "../errors/errors";
import {
  TAnnouncement,
  TCreatedAnnouncement,
} from "../interfaces/announcement.interface";
import announcementRepository from "../repositories/announcement.repository";
import userRepository from "../repositories/user.repository";
import {
  CreateAnnouncementSchema,
  RetrieveAnnouncementsSchema,
} from "../schemas/announcement.schema";

const createAnnouncement = async (
  payload: TAnnouncement,
  userId: number
): Promise<TCreatedAnnouncement> => {
  const newAnnouncement = announcementRepository.create(payload);

  const foundUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });
  newAnnouncement.user = foundUser!;

  await announcementRepository.save(newAnnouncement);

  return CreateAnnouncementSchema.parse(newAnnouncement);
};

const retrieveAllAnnouncements = async () => {
  const allAnnouncements = await announcementRepository.find({
    relations: {
      user: true,
    },
  });

  return RetrieveAnnouncementsSchema.parse(allAnnouncements);
};

const retrieveAnnouncementById = async (announcementId: number) => {
  const foundAnnouncement = await announcementRepository.findOne({
    where: { id: announcementId },
  });

  if (!foundAnnouncement) {
    throw new AppError("Announcement not found, please check the id!", 409);
  }

  return foundAnnouncement;
};

export {
  createAnnouncement,
  retrieveAllAnnouncements,
  retrieveAnnouncementById,
};
