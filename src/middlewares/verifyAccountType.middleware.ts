import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { AppError } from "../errors/errors";
import { TOnlyUser } from "../interfaces/user.interface";

const verifyAccountType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(res.locals.decoded.sub);

  const currentUser: TOnlyUser | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (currentUser!.is_seller === false) {
    throw new AppError("You are not authorized to perfom this action.", 403);
  }

  return next();
};

export default verifyAccountType;
