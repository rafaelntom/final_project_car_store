import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { UserReturnSchema } from "../schemas/user.schema";

const create = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUser(userData);
  return res.status(201).json(newUser);
};

export default { create };
