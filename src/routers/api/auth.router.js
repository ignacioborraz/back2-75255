import { Router } from "express";
import { usersManager } from "../../data/managers/mongo/manager.mongo.js";
import { compareHash, createHash } from "../../helpers/hash.helper.js";
import isUser from "../../middlewares/isUser.mid.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    if (!req.body.email || !req.body.password || !req.body.city) {
      const error = new Error("Invalid data");
      error.statusCode = 400;
      throw error;
    }
    const { email } = req.body;
    let user = await usersManager.readBy({ email });
    if (user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    req.body.password = createHash(req.body.password);
    user = await usersManager.createOne(req.body);
    return res
      .status(201)
      .json({ message: "Registered", response: user._id, method, url });
  } catch (error) {
    next(error);
  }
};
const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Invalid data");
      error.statusCode = 400;
      throw error;
    }
    let user = await usersManager.readBy({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const verifyPass = compareHash(password, user.password);
    if (!verifyPass) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    req.session.user_id = user._id;
    req.session.email = user.email;
    req.session.role = user.role;
    return res
      .status(200)
      .json({ message: "Logged in", response: user._id, method, url });
  } catch (error) {
    next(error);
  }
};
const signoutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    req.session.destroy();
    return res.status(200).json({
      message: "Sign out",
      method,
      url,
    });
  } catch (error) {
    next(error);
  }
};
const onlineCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    return res
      .status(200)
      .json({ message: "Is online", response: true, method, url });
  } catch (error) {
    next(error);
  }
};

authRouter.post("/register", registerCb);
authRouter.post("/login", loginCb);
authRouter.post("/signout", isUser, signoutCb);
authRouter.post("/online", isUser, onlineCb);

export default authRouter;
