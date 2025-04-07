import { Router } from "express";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

const indexRouter = Router();

indexRouter.use("/", viewsRouter);
indexRouter.use("/api", apiRouter);

export default indexRouter;
