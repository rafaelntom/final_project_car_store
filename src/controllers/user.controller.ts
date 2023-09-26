import { Request, Response } from "express";
import { createuser } from "../services/user.service";
import { UserReturnSchema } from "../schemas/user.schema";

const create = async (req: Request, res: Response) => {
  const userData = UserReturnSchema.parse(req.body);
  return res.status(201).json(userData);
};

export default { create };
