import RouterHelper from "../../helpers/router.helper.js";
import { productsManager } from "../../data/managers/mongo/manager.mongo.js";
import passport from "passport";

const createOne = async (req, res) => {
  const { method, originalUrl: url } = req;
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await productsManager.createOne(data);
  res.status(201).json({ response, method, url });
};
const readAll = async (req, res) => {
  const { method, originalUrl: url } = req;
  const filter = req.query;
  const response = await productsManager.readAll(filter);
  if (response.length === 0) {
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ response, method, url });
};
const readById = async (req, res) => {
  const { method, originalUrl: url } = req;
  const { id } = req.params;
  const response = await productsManager.readById(id);
  if (!response) {
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ response, method, url });
};
const updateById = async (req, res) => {
  const { method, originalUrl: url } = req;
  const { id } = req.params;
  const data = req.body;
  const response = await productsManager.updateById(id, data);
  if (!response) {
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ response, method, url });
};
const destroyById = async (req, res) => {
  const { method, originalUrl: url } = req;
  const { id } = req.params;
  const response = await productsManager.destroyById(id);
  if (!response) {
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ response, method, url });
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
    this.create("/", passport.authenticate("admin", optsForbidden), createOne);
    this.read("/", readAll);
    this.read("/:id", readById);
    this.update(
      "/:id",
      passport.authenticate("admin", optsForbidden),
      updateById
    );
    this.destroy(
      "/:id",
      passport.authenticate("admin", optsForbidden),
      destroyById
    );
  };
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;
