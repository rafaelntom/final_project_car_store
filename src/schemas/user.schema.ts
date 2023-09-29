import { z } from "zod";
import { AddressSchema, UpdateAdressSchema } from "./address.schema";

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
  address: AddressSchema,
});

const UserReturnSchema = UserSchema.omit({ password: true });
const UserOnlySchema = UserSchema.omit({ address: true });
const UserLoginSchema = UserSchema.pick({ email: true, password: true });

const MultipleUsersReturnSchema = UserReturnSchema.array();

const CreateUserSchema = UserSchema.omit({ id: true });

const UpdateUserSchema = z
  .object({
    is_seller: z.boolean(),
    name: z.string().max(70).nonempty(),
    email: z.string().email().max(60).nonempty(),
    cpf: z.string().max(14).nonempty(),
    phone: z.string().max(15).nonempty(),
    birth_date: z.string().or(z.date()),
    description: z.string().min(0).max(150).nullable(),
    address: UpdateAdressSchema,
  })
  .partial();

export {
  UserSchema,
  UserReturnSchema,
  MultipleUsersReturnSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UserLoginSchema,
  UserOnlySchema,
};
