import { DeepPartial } from "typeorm";
import { Image } from "../entities/images.entity";
import { AppError } from "../errors/errors";
import {
  TAnnouncement,
  TCreatedAnnouncement,
  TUpdateAnnouncement,
} from "../interfaces/announcement.interface";
import { TUser } from "../interfaces/user.interface";
import announcementRepository from "../repositories/announcement.repository";
import imagesRepository from "../repositories/images.repository";
import userRepository from "../repositories/user.repository";
import {
  AnnouncementSchema,
  CreateAnnouncementSchema,
  RetrieveAnnouncementsSchema,
  RetrieveSingleAnnouncement,
  ReturnAnnouncementSchema,
} from "../schemas/announcement.schema";
import { Announcement } from "../entities/announcement.entity";

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
      newImage.img_url = image.img_url;
      newImage.announcement = newAnnouncement;
      await imagesRepository.save(newImage);
    });
  }

  return ReturnAnnouncementSchema.parse(newAnnouncement);
};

const retrieveAllAnnouncements = async () => {
  const allAnnouncements = await announcementRepository.find({
    relations: {
      images: true,
      comments: true,
      user: true,
    },
    order: {
      id: "ASC",
    },
  });

  return RetrieveAnnouncementsSchema.parse(allAnnouncements);
};

const retrieveAnnouncementById = async (announcementId: number) => {
  const foundAnnouncement = await announcementRepository.findOne({
    where: { id: announcementId },
    relations: {
      user: true,
      images: true,
      comments: {
        user: true,
      },
    },
    order: {
      id: "ASC",
    },
  });

  if (!foundAnnouncement) {
    throw new AppError("Announcement not found, please check the id!", 404);
  }

  return RetrieveSingleAnnouncement.parse(foundAnnouncement);
};

const retrieveAnnouncementByUserId = async (userId: number) => {
  const foundAnnouncements = await announcementRepository.find({
    where: {
      user: { id: userId },
    },
    relations: ["images", "comments", "user"],
    order: {
      id: "ASC",
    },
  });

  return RetrieveAnnouncementsSchema.parse(foundAnnouncements);
};

const updateAnnouncement = async (
  payload: TAnnouncement,
  announcementId: number
) => {
  const foundAnnouncement = await announcementRepository.findOne({
    where: { id: announcementId },
    relations: {
      images: true,
    },
  });

  if (!foundAnnouncement) {
    throw new AppError("Announcement not found, please check the id!", 404);
  }

  if (payload.images) {
    const newImageUrls = payload.images.map((image) => image.img_url);

    newImageUrls.forEach(async (imageUrl) => {
      const newImage = new Image();
      newImage.img_url = imageUrl;
      newImage.announcement = foundAnnouncement;
      await imagesRepository.save(newImage);
    });

    if (payload.images.length === 0) {
      const existingImages = foundAnnouncement.images;
      payload.images = existingImages;
    }
  }

  if (!payload.images) {
    const existingImages = foundAnnouncement.images;
    payload.images = existingImages;
  }

  Object.assign(foundAnnouncement, payload);

  const updatedAnnouncement = await announcementRepository.save(
    foundAnnouncement
  );

  return updatedAnnouncement;
};

export {
  createAnnouncement,
  retrieveAllAnnouncements,
  retrieveAnnouncementById,
  retrieveAnnouncementByUserId,
  updateAnnouncement,
};
