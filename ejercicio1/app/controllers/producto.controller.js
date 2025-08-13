const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

// Crear un nuevo producto
exports.create = (req, res) => {
    if (!req.body.nombre || req.body.precio == null || req.body.stock == null) {
        res.status(400).send({
            message: "nombre, precio y stock son campos obligatorios."
        });
        return;
    }

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock
    };

    Producto.create(producto)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Error al crear el producto."
        }));
};

// Obtener todos los productos
exports.findAll = (req, res) => {
    Producto.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Error al recuperar los productos."
        }));
};

// Obtener un producto por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `No se encontró producto con id=${id}.` });
        })
        .catch(err => res.status(500).send({
            message: "Error al recuperar producto con id=" + id
        }));
};

// Actualizar un producto por id
exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Producto actualizado correctamente." });
            else res.send({ message: `No se pudo actualizar el producto con id=${id}.` });
        })
        .catch(err => res.status(500).send({
            message: "Error al actualizar producto con id=" + id
        }));
};

// Eliminar un producto por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Producto.destroy({ where: { id:id } })
        .then(num => {
            if (num == 1) res.send({ message: "Producto eliminado correctamente." });
            else res.send({ message: `No se pudo eliminar el producto con id=${id}.` });
        })
        .catch(err => res.status(500).send({
            message: "Error al eliminar producto con id=" + id
        }));
};

// Eliminar todos los productos
exports.deleteAll = (req, res) => {
    Producto.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} productos eliminados correctamente.` }))
        .catch(err => res.status(500).send({
            message: err.message || "Error al eliminar todos los productos."
        }));
};