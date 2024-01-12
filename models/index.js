const dbConfig = require("../config/dbConfig");
// console.log("dbConfig", dbConfig);
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db1 = {};

db1.Sequelize = Sequelize;
db1.sequelize = sequelize;

db1.users_info = require("./User_infoModel")(sequelize, DataTypes);

// db1.sequelize.sync({ force: false }).then(() => {
//   console.log("Re-synced!");
// });

module.exports = db1;
