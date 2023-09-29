import { z } from "zod";

const CommentSchema = z.object({
  id: z.number().positive(),
  description: z.string(),
});

const createCommentSchema = CommentSchema.omit({ id: true });

export { CommentSchema, createCommentSchema };
