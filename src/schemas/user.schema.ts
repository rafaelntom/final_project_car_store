import { z } from "zod";

const UserSchema = z.object({
  id: z.number().positive(),
  is_seller: z.boolean(),
  name: z.string().max(70).nonempty(),
  password: z.string().max(100).nonempty(),
  email: z.string().email().max(60).nonempty(),
  cpf: z.string().max(14).nonempty(),
  phone: z.string().max(15).nonempty(),
  birth_date: z.string().or(z.date()),
  description: z.string().min(0).max(150).nullable(),
});

const UserReturnSchema = UserSchema.omit({ password: true });

const UserLoginSchema = UserSchema.pick({ email: true, password: true });

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
  UserLoginSchema,
};
