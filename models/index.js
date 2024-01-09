const dbConfig = require("../config/dbConfig");
// console.log("dbConfig", dbConfig);
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

// database.users = require("../controllers/userController")(sequelize, DataTypes);
database.users_info = require("../controllers/infoController")(
  sequelize,
  DataTypes
);

database.sequelize.sync({ force: false }).then(() => {
  console.log("Re-synced!");
});

module.exports = database;
