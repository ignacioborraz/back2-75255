import RouterHelper from "../../helpers/router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const registerCb = async (req, res) => {
  const { method, originalUrl: url } = req;
  const { _id } = req.user;
  return res
    .status(201)
    .json({ message: "Registered", response: _id, method, url });
};
const loginCb = async (req, res) => {
  const { method, originalUrl: url } = req;
  const { _id } = req.user;
  return res
    .status(200)
    .cookie("token", req.user.token, { maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json({ message: "Logged in", response: _id, method, url });
};
const signoutCb = (req, res) => {
  const { method, originalUrl: url } = req;
  return res.status(200).clearCookie("token").json({
    message: "Sign out",
    method,
    url,
  });
};
const onlineCb = (req, res) => {
  const { method, originalUrl: url } = req;
  return res
    .status(200)
    .json({ message: "Is online", response: true, method, url });
};
const badAuth = (req, res) => {
  const error = new Error("Bad auth");
  error.statusCode = 401;
  throw error;
};
const forbidden = (req, res) => {
  const error = new Error("Forbidden");
  error.statusCode = 403;
  throw error;
};
/* const optsBad = { session: false, failureRedirect: "/api/auth/bad-auth" };
const optsForbidden = {
  session: false,
  failureRedirect: "/api/auth/forbidden",
}; */

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", passportCb("register"), registerCb);
    this.create("/login", passportCb("login"), loginCb);
    this.create("/signout", passportCb("user"), signoutCb);
    this.create("/online", passportCb("user"), onlineCb);
    this.read("/google", passportCb("google", { scope: ["email", "profile"] }));
    this.read("/google/redirect", passportCb("google"), loginCb);
    this.read("/bad-auth", badAuth);
    this.read("/forbidden", forbidden);
  };
}
const authRouter = (new AuthRouter()).getRouter()
export default authRouter;
