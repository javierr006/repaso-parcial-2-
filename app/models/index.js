// require: cargar el modulo db.config.js para traer los parametros preconfigurados de la BD
const dbConfig = require ("../config/db.config.js");
// sequelize "ORM": para el manejo de las entidades como objetos. 
const Sequelize = require("sequelize");
// creamos una variable sequelize y la inicializamos como un Objeto Sequelize con la informacion de la BD 

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // cambia a true si tienes certificado válido
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// creamos un objeto db
const db = {};
// la variable db.Sequelize = modulo importado Sequelize que esta declarado previamente donde se importa el modulo
db.Sequelize = Sequelize;
// se define una variable con la configuracion de sequelize
db.sequelize = sequelize;

// se crea una variable clientes que importa el modelo que esta dentro de la carpeta models/cliente.model.js
const Tarea = require("./tareas.model.js")(sequelize,Sequelize);
const Usuario = require("./usuario.model.js")(sequelize,Sequelize);

db.tareas    =  Tarea;
db.usuarios  =  Usuario;


Usuario.hasMany(Tarea, { foreignKey: 'id_usuario' });
Tarea.belongsTo(Usuario, {foreignKey:'id_usuario'});
module.exports = db;