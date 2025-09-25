const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Crear un nuevo usuario
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Nombre no puede estar vacío!"
        });
        return;
    }

    const usuario = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        fecha_creacion: req.body.fecha_creacion,
    };

    Usuario.create(usuario)
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

    Usuario.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido un error obteniendo los usuarios."
            });
        });
};

// Obtener un usuario por ID
exports.findOne = (req, res) => {
    const id_usuario = req.params.id;

    Usuario.findByPk(id_usuario)
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

    Usuario.findAll({
        where: { nombre: { [Op.iLike]: `%${nombre}%` } }
    })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontraron usuarios con el nombre ${nombre}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al buscar usuarios por nombre: " + err.message
            });
        });
};

// Actualizar un usuario por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, {
        where: { id_usuario: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El usuario ha sido actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar usuario con id=${id}. Tal vez el usuario no fue encontrado o el req.body está vacío!`
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

    Usuario.destroy({
        where: { id_usuario: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Usuario fue eliminado correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el usuario con id=${id}. Usuario no encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el usuario con id=" + id_usuario
            });
        });
};

