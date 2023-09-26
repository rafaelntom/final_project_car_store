import { z } from "zod";
import {
  CreateUserSchema,
  MultipleUsersReturnSchema,
  UpdateUserSchema,
  UserLoginSchema,
  UserReturnSchema,
  UserSchema,
} from "../schemas/user.schema";

type TUser = z.infer<typeof UserSchema>;
type TUserReturn = z.infer<typeof UserReturnSchema>;
type TMultipleUsers = z.infer<typeof MultipleUsersReturnSchema>;
type TCreateUser = z.infer<typeof CreateUserSchema>;
type TUpdateUser = z.infer<typeof UpdateUserSchema>;
type TUserLogin = z.infer<typeof UserLoginSchema>;

export {
  TUser,
  TUserReturn,
  TMultipleUsers,
  TCreateUser,
  TUpdateUser,
  TUserLogin,
};
