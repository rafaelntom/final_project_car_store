import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { AppError } from "../errors/errors";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.email) {
    const userEmailAlreadyExists = await userRepository.exist({
      where: {
        email: req.body.email,
      },
    });

    if (userEmailAlreadyExists) {
      throw new AppError(
        "Sorry, this email address is already associated with an existing account. Please use a different email address",
        409
      );
    }
  }

  return next();
};

export default verifyEmail;
