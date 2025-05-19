import RouterHelper from "../../helpers/router.helper.js";
import {
  registerCb,
  loginCb,
  signoutCb,
  onlineCb,
  badAuth,
  forbidden,
} from "../../controllers/auth.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginCb);
    this.create("/signout", ["USER", "ADMIN"], signoutCb);
    this.create("/online", ["USER", "ADMIN"], onlineCb);
    this.read("/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));
    this.read("/google/redirect", ["PUBLIC"], passportCb("google"), loginCb);
    this.read("/bad-auth", ["PUBLIC"], badAuth);
    this.read("/forbidden", ["PUBLIC"], forbidden);
  };
}
const authRouter = new AuthRouter().getRouter();
export default authRouter;
