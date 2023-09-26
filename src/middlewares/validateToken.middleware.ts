import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { verify } from "jsonwebtoken";

const validateHeaderToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization: string | null | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = authorization.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    res.locals = { ...res.locals, decoded };
  });

  return next();
};

export default validateHeaderToken;
