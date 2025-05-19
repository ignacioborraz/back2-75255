import { Router } from "express";
import { createCb, readCb, destroyCb } from "../../controllers/sessions.controller.js"

const sessionsRouter = Router();

sessionsRouter.get("/create", createCb);
sessionsRouter.get("/read", readCb);
sessionsRouter.get("/destroy", destroyCb);

export default sessionsRouter;
