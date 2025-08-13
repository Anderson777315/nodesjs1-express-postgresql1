module.exports = (sequelize, Sequelize) => {
  const Detalle = sequelize.define("detalle", {
    id_detalle: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pedido: {
      type: Sequelize.INTEGER,
    },
    id_producto: {
      type: Sequelize.INTEGER,
    },
    cantidad: {
      type: Sequelize.INTEGER,
    },
    subtotal: {
      type: Sequelize.DECIMAL(10, 2),
    }
  });

  return Detalle;
};
