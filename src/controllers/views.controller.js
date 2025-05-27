import { productsService } from "../services/service.js"

const indexView = async (req, res) => {
  const products = await productsService.readAllService()
  res.status(200).render("index", { products });
};
const registerView = async (req, res) => {
  res.status(200).render("register");
};
const loginView = async (req, res) => {
  res.status(200).render("login");
};
const detailsView = async (req, res) => {
  const { pid } = req.params;
  const product = await productsService.readByIdService(pid)
  res.status(200).render("details", { product });
};
const profileView = async (req, res) => {
  const { user } = req;
  res.status(200).render("profile", { user });
};
const updateView = async (req, res) => {
  res.status(200).render("update-user");
};

export {
  indexView,
  registerView,
  loginView,
  detailsView,
  profileView,
  updateView,
};
