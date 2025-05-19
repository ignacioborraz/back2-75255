import productsService from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = productsService;
  }
  createOne = async (req, res) => {
    const data = req.body;
    data.owner_id = req.user._id;
    const response = await this.service.createOne(data);
    res.json201(response);
  };
  readAll = async (req, res) => {
    const filter = req.query;
    const response = await this.service.readAll(filter);
    if (response.length === 0) {
      res.json404();
    }
    res.json200(response);
  };
  readById = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.readById(id);
    if (!response) {
      res.json404();
    }
    res.json200(response);
  };
  updateById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const response = await this.service.updateById(id, data);
    if (!response) {
      res.json404();
    }
    res.json200(response);
  };
  destroyById = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.destroyById(id);
    if (!response) {
      res.json404();
    }
    res.json200(response);
  };
}

const productsController = new ProductsController();
const { createOne, readAll, readById, updateById, destroyById } =
  productsController;
export { createOne, readAll, readById, updateById, destroyById };
