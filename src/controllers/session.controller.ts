import { Request, Response } from "express";
import { userLogin } from "../services/session.service";

const login = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const token = await userLogin(payload);

  return res.status(200).json({ token });
};

export default { login };
