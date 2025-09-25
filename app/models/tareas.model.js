module.exports = (sequelize, Sequelize) => {
    const Tarea = sequelize.define("tareas", {

        id_tarea: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        id_usuario: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        nombre: {
            type: Sequelize.STRING(100),
            
        },
        estado: {
            type: Sequelize.ENUM('pendiente', 'en_proceso', 'completada'),
            
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            
        },
        fecha_vencimiento: {
            type: Sequelize.DATE,
           
        }
    });

    return Tarea;
}