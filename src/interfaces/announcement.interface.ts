import { z } from "zod";
import {
  AnnouncementSchema,
  CreateAnnouncementSchema,
  RetrieveAnnouncementsSchema,
} from "../schemas/announcement.schema";

type TAnnouncement = z.infer<typeof AnnouncementSchema>;
type TCreatedAnnouncement = z.infer<typeof CreateAnnouncementSchema>;
type TAnnouncementList = z.infer<typeof RetrieveAnnouncementsSchema>;

export { TAnnouncement, TAnnouncementList, TCreatedAnnouncement };
