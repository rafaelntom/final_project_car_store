import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import { userRouter } from "./routers/user.router";
import { sessionRouter } from "./routers/session.router";
import { announcementRouter } from "./routers/announcement.router";
import { commentRouter } from "./routers/comment.router";
let cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/announcements", announcementRouter);
app.use("/comments", commentRouter);

app.use(errorHandler);

export default app;
