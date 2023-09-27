import { z } from "zod";

const AnnouncementUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const AnnouncementSchema = z.object({
  id: z.number().positive(),
  images: z.array(z.string().url()),
  brand: z.string().min(1).max(40).nonempty(),
  model: z.string().min(1).max(50).nonempty(),
  year: z
    .string()
    .min(1)
    .max(4, { message: "Insert the year e.g: 2008" })
    .nonempty(),
  fuel_type: z.string().min(1).max(15).nonempty(),
  milage: z.string().min(1).max(10).nonempty(),
  color: z.string().min(1).max(15).nonempty(),
  price_fipe: z.string().nonempty().or(z.number().nonnegative()),
  price: z.string().nonempty().or(z.number().nonnegative()),
  description: z.string(),
  user: AnnouncementUserSchema,
});

const CreateAnnouncementSchema = AnnouncementSchema.omit({
  id: true,
  user: true,
});

const ReturnAnnouncementSchema = AnnouncementSchema.omit({
  user: true,
  images: true,
});

const RetrieveAnnouncementsSchema = AnnouncementSchema.array();

export {
  AnnouncementSchema,
  CreateAnnouncementSchema,
  RetrieveAnnouncementsSchema,
  ReturnAnnouncementSchema,
};
