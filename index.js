import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import __dirname from "./utils.js";
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";

/* server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("server ready on port " + port);
  await dbConnect(process.env.LINK_DB);
};
server.listen(port, ready);

/* engine settings */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares settings */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

/* router settings */
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
