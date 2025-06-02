import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { updateUser, sendEmail } from "../../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.put(
  "/",
  passport.authenticate("user", { session: false }),
  updateUser
);
usersRouter.get("/:email", sendEmail);

export default usersRouter;
