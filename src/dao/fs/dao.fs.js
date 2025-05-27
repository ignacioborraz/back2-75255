class DaoFs {
  constructor() {}
  createOne = async (data) => {
    /* logica para crear uno con fs */
  };
  readAll = async (filter) => {
    /* logica para leer todos con fs */
  };
  readById = async (id) => {
    /* logica para leer por id con fs */
  };
  readBy = async (filter) => {
    /* logica para leer uno con fs */
  };
  updateById = async (id, data) => {
    /* logica para actualizar uno con fs */
  };
  destroyById = async (id) => {
    /* logica para eliminar uno con fs */
  };
}

const productsManager = new DaoFs();
const cartsManager = new DaoFs();
const usersManager = new DaoFs();

export { productsManager, cartsManager, usersManager };
