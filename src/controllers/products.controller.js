import {
  createOneService,
  readAllService,
  readByIdService,
  updateByIdService,
  destroyByIdService,
} from "../services/products.service.js";

const createOne = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await createOneService(data);
  res.json201(response);
};
const readAll = async (req, res) => {
  const filter = req.query;
  const response = await readAllService(filter);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};
const readById = async (req, res) => {
  const { id } = req.params;
  const response = await readByIdService(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await updateByIdService(id, data);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const destroyById = async (req, res) => {
  const { id } = req.params;
  const response = await destroyByIdService(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};

export { createOne, readAll, readById, updateById, destroyById };
