import { Request, Response } from "express";
import {
  createComment,
  deleteComment,
  listAnnouncementComments,
} from "../services/comment.service";

const create = async (req: Request, res: Response) => {
  const userId = res.locals.decoded.sub;
  const announcementId = Number(req.params.id);
  const comment = await createComment(
    userId,
    announcementId,
    req.body.description
  );

  return res.status(200).json(comment);
};

const read = async (req: Request, res: Response) => {
  const foundAnnouncementComments = await listAnnouncementComments(
    Number(req.params.id)
  );

  return res.status(200).json(foundAnnouncementComments);
};

const removeComment = async (req: Request, res: Response) => {
  const commentId = Number(req.params.id);
  await deleteComment(commentId);

  return res.status(204).json();
};

export default { create, read, removeComment };
