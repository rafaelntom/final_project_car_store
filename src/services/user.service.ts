import { hashSync } from "bcryptjs";
import { TCreateUser, TUserReturn } from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import { UserReturnSchema } from "../schemas/user.schema";
import addressRepository from "../repositories/address.repository";

//: Promise<TUserReturn>

const createUser = async (payload: TCreateUser) => {
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

const deleteUser = async (id: number) => {
  await userRepository.delete(id);
};

export { createUser, deleteUser };
