import { productsManager } from "../data/managers/mongo/manager.mongo.js";

const createOneService = async (data) => await productsManager.createOne(data);
const readAllService = async (filter) => await productsManager.readAll(filter);
const readByIdService = async (id) => await productsManager.readById(id);
const updateByIdService = async (id, data) => await productsManager.updateById(id, data);
const destroyByIdService = async (id) => await productsManager.destroyById(id);

export {
  createOneService,
  readAllService,
  readByIdService,
  updateByIdService,
  destroyByIdService,
};
