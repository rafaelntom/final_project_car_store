import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

const verifyAccountOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIdParam = req.params.id;
  const currentUser = res.locals.decoded.sub;

  if (userIdParam != currentUser) {
    throw new AppError("You are not authorized to perfom this action.", 403);
  }

  return next();
};

export default verifyAccountOwner;
