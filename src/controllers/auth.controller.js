import { usersService } from "../services/service.js";

class AuthController {
  registerCb = async (req, res) => {
    const { _id } = req.user;
    res.json201(_id, "Registered");
  };
  loginCb = async (req, res) => {
    const { _id } = req.user;
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
    res.cookie("token", req.user.token, opts).json200(_id, "Logged in");
  };
  signoutCb = (req, res) => res.clearCookie("token").json200(req.user._id, "Sign out");
  onlineCb = (req, res) => res.json200(req.user, "Is online");
  badAuth = (req, res) => res.json401();
  forbidden = (req, res) => res.json403();
  verifyUserCb = async(req, res)=> {
    const { email, verifyCode } = req.params
    const user = await usersService.readBy({ email, verifyCode })
    if (!user) {
      res.json404()
    }
    await usersService.updateById(user._id, { isVerified: true })
    res.json200(user, "Verified!")
  }
}

const authController = new AuthController();
export default authController;

const { registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden, verifyUserCb } = authController;
export { registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden, verifyUserCb };
