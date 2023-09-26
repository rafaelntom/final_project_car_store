import { TCreateUser, TUserReturn } from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import { UserReturnSchema } from "../schemas/user.schema";

const createUser = async (payload: TCreateUser): Promise<TUserReturn> => {
  const newUser = userRepository.create(payload);
  await userRepository.save(newUser);

  return UserReturnSchema.parse(newUser);
};

const deleteUser = async (id: number) => {
  await userRepository.delete(id);
};

export { createUser, deleteUser };
