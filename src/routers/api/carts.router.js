import RouterHelper from "../../helpers/router.helper.js";

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {};
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;
