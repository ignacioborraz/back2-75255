import RouterHelper from "../helpers/router.helper.js";
import {
  indexView,
  registerView,
  loginView,
  detailsView,
  profileView,
  updateView,
} from "../controllers/views.controller.js";

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", ["PUBLIC"], indexView);
    this.render("/register", ["PUBLIC"], registerView);
    this.render("/login", ["PUBLIC"], loginView);
    this.render("/details/:pid", ["PUBLIC"], detailsView);
    this.render("/profile", ["USER", "ADMIN"], profileView);
    this.render("/update-user", ["USER", "ADMIN"], updateView);
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;
