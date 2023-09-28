import { Request, Response } from "express";
import {
  createAnnouncement,
  retrieveAllAnnouncements,
  retrieveAnnouncementById,
  retrieveAnnouncementByUserId,
  updateAnnouncement,
} from "../services/announcement.service";

const create = async (req: Request, res: Response) => {
  const userId = Number(res.locals.decoded.sub);
  const newAnnouncement = await createAnnouncement(req.body, userId);

  return res.status(201).json(newAnnouncement);
};

const readAll = async (req: Request, res: Response) => {
  const allAnnouncements = await retrieveAllAnnouncements();

  return res.status(200).json(allAnnouncements);
};

const readById = async (req: Request, res: Response) => {
  const announcement = await retrieveAnnouncementById(Number(req.params.id));

  return res.status(200).json(announcement);
};

const readByUser = async (req: Request, res: Response) => {
  const announcements = await retrieveAnnouncementByUserId(
    Number(req.params.id)
  );

  return res.status(200).json(announcements);
};

const update = async (req: Request, res: Response) => {
  const announcementId = Number(req.params.id);
  const announcement = await updateAnnouncement(req.body, announcementId);

  return res.status(200).json(announcement);
};

export default { create, readAll, readById, readByUser, update };
