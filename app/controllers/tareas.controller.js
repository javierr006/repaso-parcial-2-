const db = require("../models");
const Tarea = db.tareas;
const Op = db.Sequelize.Op;

// Crear una nueva tarea
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Nombre no puede estar vacío!"
        });
        return;
    }

    const tarea = {
        id_usuario: req.body.id_usuario,
        nombre: req.body.nombre,
        estado: req.body.estado,
        fecha_creacion: req.body.fecha_creacion,
        fecha_vencimiento: req.body.fecha_vencimiento,
    };

    Tarea.create(tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido un error creando la tarea."
            });
        });
};

// Obtener todas las tareas (con filtro por nombre opcional)
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Tarea.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido un error obteniendo las tareas."
            });
        });
};

// Obtener una tarea por ID
exports.findOne = (req, res) => {
    const id_tarea = req.params.id;

    Tarea.findByPk(id_tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ha ocurrido un error obteniendo la tarea con el id=" + id_tarea
            });
        });
};

// Obtener tareas por nombre
exports.findByName = (req, res) => {
    const nombre = req.params.nombre;

    Tarea.findAll({
        where: { nombre: { [Op.iLike]: `%${nombre}%` } }
    })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontraron tareas con el nombre ${nombre}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al buscar tareas por nombre: " + err.message
            });
        });
};

// Actualizar una tarea por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Tarea.update(req.body, {
        where: { id_tarea: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La tarea ha sido actualizada correctamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar tarea con id=${id}. Tal vez la tarea no fue encontrada o el req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando tarea con id=" + id_tarea  
            });
        });
};

// Eliminar una tarea por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Tarea.destroy({
        where: { id_tarea: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tarea fue eliminada correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la tarea con id=${id}. Tarea no encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la tarea con id=" + id_tarea
            });
        });
};

