import RouterHelper from "../helpers/router.helper.js";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";
import passport from "../middlewares/passport.mid.js";

const indexView = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("index", { products });
};
const registerView = async (req, res) => {
  res.status(200).render("register");
};
const loginView = async (req, res) => {
  res.status(200).render("login");
};
const detailsView = async (req, res) => {
  const { pid } = req.params;
  const product = await productsManager.readById(pid);
  res.status(200).render("details", { product });
};
const profileView = async (req, res) => {
  const { user } = req;
  res.status(200).render("profile", { user });
};
const updateView = async (req, res) => {
  res.status(200).render("update-user");
};

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", indexView);
    this.render("/register", registerView);
    this.render("/login", loginView);
    this.render("/details/:pid", detailsView);
    this.render(
      "/profile",
      passport.authenticate("user", { session: false }),
      profileView
    );
    this.render("/update-user", updateView);
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;
