import { hashSync } from "bcryptjs";
import { TCreateUser, TUserReturn } from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import {
  GetOneUserSchema,
  UpdateUserSchema,
  UserReturnSchema,
} from "../schemas/user.schema";
import addressRepository from "../repositories/address.repository";

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

const updateUser = async (payload: any, userId: number) => {
  const foundUser = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      address: true,
    },
  });

  if (payload.address) {
    const { address, ...userInfoPayload } = payload;

    const existingAddress = await addressRepository.findOne({
      where: {
        user: !foundUser,
      },
    });

    const updatedAddress = { ...existingAddress, ...address };

    await addressRepository.save(updatedAddress);

    const updatedUser = { ...foundUser, ...userInfoPayload };

    await userRepository.save(updatedUser);

    return UpdateUserSchema.parse(updatedUser);
  }

  const updatedUser = { ...foundUser, ...payload };
  await userRepository.save(updatedUser);

  return UpdateUserSchema.parse(updatedUser);
};

const getUserById = async (userId: number) => {
  const foundUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  return GetOneUserSchema.parse(foundUser);
};

export { createUser, deleteUser, updateUser, getUserById };
