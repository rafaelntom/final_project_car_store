import { Request, Response } from "express";
import { createComment } from "../services/comment.service";

const create = async (req: Request, res: Response) => {
  const comment = await createComment(1, 2, req.body.description);

  return res.status(200).json(comment);
};

export default { create };
