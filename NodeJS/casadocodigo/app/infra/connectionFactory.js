let mysql = require("mysql");

function createDBConnection() {

  if (!process.env.NODE_ENV) {
    return mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "casadocodigo_nodejs"
    });
  } else if (process.env.NODE_ENV == "test") {
    return mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "casadocodigo_nodejs_test"
    });
  }
}

// wrapper
module.exports = () => {
  return createDBConnection;
};
