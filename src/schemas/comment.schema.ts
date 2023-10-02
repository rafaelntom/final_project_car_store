import { z } from "zod";
import { AnnouncementSchema } from "./announcement.schema";

const CommentUserSchema = z.object({
  id: z.number().positive(),
  is_seller: z.boolean(),
  name: z.string(),
  email: z.string().email(),
});

const CommentSchema = z.object({
  id: z.number().positive(),
  description: z.string(),
  created_at: z.string(),
  user: CommentUserSchema,
});

const CreateCommentSchema = CommentSchema.omit({
  id: true,
  user: true,
  created_at: true,
});

const CommentAnnouncementReturnSchema = z.object({
  id: z.number().positive(),
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
  comments: z.array(
    z.object({
      id: z.number().positive(),
      description: z.string(),
      created_at: z.string(),
      user: z.object({
        id: z.number(),
        is_seller: z.boolean(),
        name: z.string(),
        email: z.string().email(),
      }),
    })
  ),
});

export { CommentSchema, CreateCommentSchema, CommentAnnouncementReturnSchema };
