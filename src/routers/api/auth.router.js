import { Router } from "express";
import passportCb from "../../middlewares/passportCb.mid.js";
//import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(201)
      .json({ message: "Registered", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};
const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(200)
      .cookie("token", req.user.token, { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ message: "Logged in", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};
const signoutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    return res.status(200).clearCookie("token").json({
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
const badAuth = (req, res, next) => {
  try {
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};
const forbidden = (req, res, next) => {
  try {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  } catch (error) {
    next(error);
  }
};
/* const optsBad = { session: false, failureRedirect: "/api/auth/bad-auth" };
const optsForbidden = {
  session: false,
  failureRedirect: "/api/auth/forbidden",
}; */

authRouter.post("/register", passportCb("register"), registerCb);
authRouter.post("/login", passportCb("login"), loginCb);
authRouter.post("/signout", passportCb("user"), signoutCb);
authRouter.post("/online", passportCb("user"), onlineCb);
authRouter.get(
  "/google",
  passportCb("google", { scope: ["email", "profile"] })
);
authRouter.get("/google/redirect", passportCb("google"), loginCb);
authRouter.get("/bad-auth", badAuth);
authRouter.get("/forbidden", forbidden);

export default authRouter;
