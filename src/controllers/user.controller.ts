import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../services/user.service";

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

const readById = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const foundUser = await getUserById(userId);
  return res.status(200).json(foundUser);
};

export default { create, remove, update, readById };
