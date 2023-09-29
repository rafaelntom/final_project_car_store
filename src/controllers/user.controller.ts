import { Request, Response } from "express";
import { createUser, deleteUser, updateUser } from "../services/user.service";

const create = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUser(userData);
  return res.status(201).json(newUser);
};

const remove = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  await deleteUser(userId);
  return res.status(204).json();
};

const update = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const updatedUserInfo = await updateUser(req.body, userId);
  return res.status(200).json(updatedUserInfo);
};

export default { create, remove, update };
