import { hashSync } from "bcryptjs";
import {
  TCreateUser,
  TOnlyUser,
  TUpdateUser,
  TUser,
  TUserReturn,
} from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import { UpdateUserSchema, UserReturnSchema } from "../schemas/user.schema";
import addressRepository from "../repositories/address.repository";
import { DeepPartial } from "typeorm";
import { User } from "../entities/user.entity";

const createUser = async (payload: TCreateUser): Promise<TUserReturn> => {
  const { address, ...userPayload } = payload;

  const hashedPassword = hashSync(userPayload.password, 10);
  userPayload.password = hashedPassword;

  const userAddress = addressRepository.create(address);
  await addressRepository.save(userAddress);

  const newUser = userRepository.create(userPayload);
  newUser.address = userAddress;

  await userRepository.save(newUser);

  return UserReturnSchema.parse(newUser);
};

const deleteUser = async (id: number): Promise<void> => {
  await userRepository.delete(id);
};

const updateUser = async (
  payload: TUpdateUser,
  user: TOnlyUser
): Promise<TUpdateUser> => {
  const updatedUserInfo: TUpdateUser = await userRepository.save({
    ...(user as DeepPartial<User>),
    ...(payload as DeepPartial<User>),
  });

  return UpdateUserSchema.parse(updatedUserInfo);
};

export { createUser, deleteUser, updateUser };
