const db = require("../models");
const Detalle = db.detalle_pedido;
const Op = db.Sequelize.Op;

// Create and Save a new Detalle
exports.create = (req, res) => {
    // Validamos que los campos obligatorios no estén vacíos
    if (!req.body.id_pedido || !req.body.id_producto || !req.body.cantidad || !req.body.subtotal) {
        res.status(400).send({
            message: "Todos los campos id_pedido, id_producto, cantidad y subtotal son obligatorios."
        });
        return;
    }

    // Creamos el objeto detalle
    const detalle = {
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal
    };

    // Guardamos en la base de datos
    Detalle.create(detalle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el detalle de pedido."
            });
        });
};

// Recuperar todos los detalles de pedido
exports.findAll = (req, res) => {
    Detalle.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los detalles."
            });
        });
};

// Encontrar un detalle por id_detalle
exports.findOne = (req, res) => {
    const id = req.params.id;

    Detalle.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró detalle con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar detalle con id=" + id
            });
        });
};

// Actualizar un detalle por id
exports.update = (req, res) => {
    const id = req.params.id;

    Detalle.update(req.body, {
        where: { id_detalle: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detalle de pedido actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el detalle con id=${id}. Tal vez no fue encontrado o req.body está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el detalle con id=" + id
            });
        });
};

// Eliminar un detalle por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Detalle.destroy({
        where: { id_detalle: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detalle eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el detalle con id=${id}. Tal vez no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el detalle con id=" + id
            });
        });
};

// Eliminar todos los detalles
exports.deleteAll = (req, res) => {
    Detalle.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} detalles eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los detalles."
            });
        });
};
