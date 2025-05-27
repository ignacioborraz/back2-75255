import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { usersRepository } from "../../repositories/repository.js";

const usersRouter = Router();

const updateUser = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    const { _id } = req.user;
    const response = await usersRepository.updateById(_id, data);
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
