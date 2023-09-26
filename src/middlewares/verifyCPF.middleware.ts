import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { AppError } from "../errors/errors";

const verifyCPF = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.cpf) {
    const userCPFAlreadyExists = await userRepository.exist({
      where: {
        cpf: req.body.cpf,
      },
    });

    if (userCPFAlreadyExists) {
      throw new AppError(
        "Sorry, this CPF is already associated with an existing account",
        409
      );
    }
  }

  return next();
};

export default verifyCPF;
