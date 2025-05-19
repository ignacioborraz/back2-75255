import { productsManager } from "../data/managers/mongo/manager.mongo.js";

class ProductsService {
  constructor() {
    this.manager = productsManager;
  }
  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const productsService = new ProductsService();
export default productsService;
