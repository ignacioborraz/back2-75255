import {
  cartsManager,
  productsManager,
  usersManager,
} from "../dao/factory.js";
import UsersDTO from "../dto/users.dto.js";
import ProductsDTO from "../dto/products.dto.js";
import CartsDTO from "../dto/carts.dto.js";

class Repository {
  constructor(manager, Dto) {
    this.manager = manager;
    this.Dto = Dto
  }
  createOne = async (data) => await this.manager.createOne(new this.Dto(data));
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  readBy = async (filter) => await this.manager.readBy(filter);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const productsRepository = new Repository(productsManager, ProductsDTO);
const cartsRepository = new Repository(cartsManager, CartsDTO);
const usersRepository = new Repository(usersManager, UsersDTO);

export { productsRepository, cartsRepository, usersRepository };
