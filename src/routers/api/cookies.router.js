import { Router } from "express";
import { createCb, createSignedCb, readCb, readSignedCb, clearCb } from "../../controllers/cookies.controller.js"

const cookiesRouter = Router();

cookiesRouter.get("/create", createCb);
cookiesRouter.get("/create-signed", createSignedCb);
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/read-signed", readSignedCb);
cookiesRouter.get("/clear", clearCb);

export default cookiesRouter;
