import { Request, Response } from "express";
import { createUser, deleteUser } from "../services/user.service";
import { UserReturnSchema } from "../schemas/user.schema";

const create = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUser(userData);
  return res.status(201).json(newUser);
};

const remove = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  await deleteUser(userId);
  return res.status(204).json(userId);
};

export default { create, remove };
