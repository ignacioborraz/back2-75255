import {
  cartsManager,
  productsManager,
  usersManager,
} from "../data/managers/mongo/manager.mongo.js";

class Service {
  constructor(manager) {
    this.manager = manager;
  }
  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const productsService = new Service(productsManager);
const cartsService = new Service(cartsManager);
const usersService = new Service(usersManager);

export { productsService, cartsService, usersService };
