import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import { userRouter } from "./routers/user.router";
import { sessionRouter } from "./routers/session.router";

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", sessionRouter);

app.use(errorHandler);

export default app;
