import { Router } from "express";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import usersRouter from "./api/users.router.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
