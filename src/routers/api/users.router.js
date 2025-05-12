import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { usersManager } from "../../data/managers/mongo/manager.mongo.js";

const usersRouter = Router();

const updateUser = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    const { _id } = req.user;
    const response = await usersManager.updateById(_id, data);
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};

usersRouter.put(
  "/",
  passport.authenticate("user", { session: false }),
  updateUser
);

export default usersRouter;
