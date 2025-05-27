class DaoMemory {
  constructor() {}
  createOne = async (data) => {
    /* logica para crear uno con memory */
  };
  readAll = async (filter) => {
    /* logica para leer todos con memory */
  };
  readById = async (id) => {
    /* logica para leer por id con memory */
  };
  readBy = async (filter) => {
    /* logica para leer uno con memory */
  };
  updateById = async (id, data) => {
    /* logica para actualizar uno con memory */
  };
  destroyById = async (id) => {
    /* logica para eliminar uno con memory */
  };
}

const productsManager = new DaoMemory();
const cartsManager = new DaoMemory();
const usersManager = new DaoMemory();

export { productsManager, cartsManager, usersManager };
