module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuarios", {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        correo: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        contraseña: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return Usuario;
}