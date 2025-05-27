const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    /* si la pesistencia es la memoria */
    /* debo cargar el objeto dao con los daos de la memoria */
    {
      console.log("memory connected");
      const { productsManager, cartsManager, usersManager } = await import(
        "./memory/dao.memory.js"
      );
      dao = { productsManager, cartsManager, usersManager };
    }
    break;
  case "fs":
    /* si la pesistencia es los archivos */
    /* debo cargar el objeto dao con los daos de los archivos */
    {
      console.log("fs connected");
      const { productsManager, cartsManager, usersManager } = await import(
        "./fs/dao.fs.js"
      );
      dao = { productsManager, cartsManager, usersManager };
    }
    break;
  //case "mysql":
  //break
  default: /* por defecto vamos a dejar mongo */
    {
      console.log("mongo database connected");
      const { productsManager, cartsManager, usersManager } = await import(
        "./mongo/dao.mongo.js"
      );
      dao = { productsManager, cartsManager, usersManager };
    }
    break;
}

const { productsManager, cartsManager, usersManager } = dao;
export { productsManager, cartsManager, usersManager };
export default dao;
