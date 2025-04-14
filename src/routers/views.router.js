import { Router } from "express";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";

const viewsRouter = Router();

const indexView = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    res.status(200).render("index", { products });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const registerView = async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const loginView = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

viewsRouter.get("/", indexView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/login", loginView);

export default viewsRouter;
