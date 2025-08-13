module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
    var router = require("express").Router();
    // Crear nuevo producto
    router.post("/create/", productos.create);
    // Obtener todos los productos
    router.get("/", productos.findAll);
    // Obtener un producto por ID
    router.get("/:id", productos.findOne);
    // Actualizar producto
    router.put("/update/:id", productos.update);
    // Eliminar producto por ID
    router.delete("/delete/:id", productos.delete);
    // Eliminar todos los productos
    router.delete("/delete/", productos.deleteAll);
    // Usar prefijo /api/productos/
    app.use("/api/productos", router);
};
