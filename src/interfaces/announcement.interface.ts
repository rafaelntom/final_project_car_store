import { z } from "zod";
import {
  AnnouncementSchema,
  CreateAnnouncementSchema,
  RetrieveAnnouncementsSchema,
  UpdateAnnouncementSchema,
} from "../schemas/announcement.schema";

type TAnnouncement = z.infer<typeof AnnouncementSchema>;
type TCreatedAnnouncement = z.infer<typeof CreateAnnouncementSchema>;
type TAnnouncementList = z.infer<typeof RetrieveAnnouncementsSchema>;

type TUpdateAnnouncement = z.infer<typeof UpdateAnnouncementSchema>;

export {
  TAnnouncement,
  TAnnouncementList,
  TCreatedAnnouncement,
  TUpdateAnnouncement,
};
