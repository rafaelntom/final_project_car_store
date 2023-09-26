import { z } from "zod";

const UserSchema = z.object({
  id: z.number().positive(),
  account_type: z.enum(["Comprador", "Anunciante"]),
  name: z.string().min(1).max(70).nonempty(),
  password: z.string().min(1).max(100).nonempty(),
  email: z.string().min(1).max(60).nonempty(),
  cpf: z.string().min(1).max(14),
  phone: z.string().min(1).max(15),
  birth_date: z.string().or(z.date()),
  description: z.string().min(0).max(150).nullable(),
});

const UserReturnSchema = UserSchema.omit({ password: true });

const MultipleUsersReturnSchema = UserReturnSchema.array();

const CreateUserSchema = UserSchema.omit({ id: true });
const UpdateUserSchema = UserSchema.omit({
  id: true,
  password: true,
}).partial();

export {
  UserSchema,
  UserReturnSchema,
  MultipleUsersReturnSchema,
  CreateUserSchema,
  UpdateUserSchema,
};
