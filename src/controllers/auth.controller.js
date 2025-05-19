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
}

const authController = new AuthController();
export default authController;

const { registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden } = authController;
export { registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden };
