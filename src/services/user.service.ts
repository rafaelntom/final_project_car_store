import { TCreateUser, TUserReturn } from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import { UserReturnSchema } from "../schemas/user.schema";

const createuser = async (payload: TCreateUser): Promise<TUserReturn> => {
  const newUser = userRepository.create(payload);
  await userRepository.save(newUser);

  return UserReturnSchema.parse(newUser);
};

export { createuser };
