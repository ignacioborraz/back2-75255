import RouterHelper from "../../helpers/router.helper.js";
import { productsManager } from "../../data/managers/mongo/manager.mongo.js";
import passport from "passport";

const createOne = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await productsManager.createOne(data);
  res.json201(response);
};
const readAll = async (req, res) => {
  const filter = req.query;
  const response = await productsManager.readAll(filter);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};
const readById = async (req, res) => {
  const { id } = req.params;
  const response = await productsManager.readById(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await productsManager.updateById(id, data);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const destroyById = async (req, res) => {
  const { id } = req.params;
  const response = await productsManager.destroyById(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const optsForbidden = {
  session: false,
  failureRedirect: "/api/auth/forbidden",
};

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:id", ["PUBLIC"], readById);
    this.update("/:id", ["ADMIN"], updateById);
    this.destroy("/:id", ["ADMIN"], destroyById);
  };
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;
