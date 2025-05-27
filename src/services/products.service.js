//import { productsRepository } from "../dao/mongo/dao.mongo.js";
//import { productsRepository } from "../dao/fs/dao.fs.js";
//import { productsRepository } from "../dao/memory/dao.memory.js";

import { productsRepository } from "../repositories/repository.js";

const createOneService = async (data) => await productsRepository.createOne(data);
const readAllService = async (filter) => await productsRepository.readAll(filter);
const readByIdService = async (id) => await productsRepository.readById(id);
const updateByIdService = async (id, data) => await productsRepository.updateById(id, data);
const destroyByIdService = async (id) => await productsRepository.destroyById(id);

export {
  createOneService,
  readAllService,
  readByIdService,
  updateByIdService,
  destroyByIdService,
};
