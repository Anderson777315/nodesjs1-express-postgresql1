module.exports = app => {
    const detalles = require("../controllers/detalle_pedido.controller.js");
    var router = require("express").Router();

    // Crear nuevo detalle de pedido
    router.post("/create/", detalles.create);

    // Obtener todos los detalles
    router.get("/", detalles.findAll);

    // Obtener detalle por ID
    router.get("/:id", detalles.findOne);

    // Actualizar detalle
    router.put("/update/:id", detalles.update);

    // Eliminar detalle por ID
    router.delete("/delete/:id", detalles.delete);

    // Eliminar todos los detalles
    router.delete("/delete/", detalles.deleteAll);

    app.use("/api/detalles", router);
};
