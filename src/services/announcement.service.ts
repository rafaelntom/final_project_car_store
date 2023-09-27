import { Image } from "../entities/images.entity";
import { AppError } from "../errors/errors";
import {
  TAnnouncement,
  TCreatedAnnouncement,
} from "../interfaces/announcement.interface";
import announcementRepository from "../repositories/announcement.repository";
import imagesRepository from "../repositories/images.repository";
import userRepository from "../repositories/user.repository";
import {
  CreateAnnouncementSchema,
  RetrieveAnnouncementsSchema,
  ReturnAnnouncementSchema,
} from "../schemas/announcement.schema";

//: Promise<TCreatedAnnouncement>

const createAnnouncement = async (payload: TAnnouncement, userId: number) => {
  const { images, ...announcementPayload } = payload;

  const newAnnouncement = announcementRepository.create(announcementPayload);

  const foundUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  newAnnouncement.user = foundUser!;
  await announcementRepository.save(newAnnouncement);

  if (images) {
    images.map(async (image) => {
      let newImage = new Image();
      newImage.img_url = image;
      newImage.announcement = newAnnouncement;
      await imagesRepository.save(newImage);
    });
  }

  return ReturnAnnouncementSchema.parse(newAnnouncement);
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
