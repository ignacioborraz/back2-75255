import { Router } from "express";
import { productsManager } from "../../data/managers/mongo/manager.mongo.js";

const productsRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    const response = await productsManager.createOne(data);
    res.status(201).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const readAll = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const filter = req.query;
    const response = await productsManager.readAll(filter);
    if (response.length === 0) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const readById = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productsManager.readById(id);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
const destroyById = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productsManager.destroyById(id);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};

productsRouter.post("/", createOne);
productsRouter.get("/", readAll);
productsRouter.get("/:id", readById);
productsRouter.put("/:id", updateById);
productsRouter.delete("/:id", destroyById);

export default productsRouter;
