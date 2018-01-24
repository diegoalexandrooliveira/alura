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
  } else if (process.env.NODE_ENV == "production") {
    // posso informar assim ouuuuu acessar variavel de ambiente
    return mysql.createConnection({
      host: "us-cdbr-iron-east-05.cleardb.net",
      user: "b1d0ff4f170764",
      password: "27ab6d6e",
      database: "heroku_2ae4a1333768240"
    });
    // let infoConexao = process.env.CLEARDB_DATABASE_URL.match(
    //   /mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/
    // );
    // return mysql.createConnection({
    //   host: infoConexao[3],
    //   user: "b1d0ff4f170764",
    //   password: "27ab6d6e",
    //   database: "heroku_2ae4a1333768240"
    // });
  }
}

// wrapper
module.exports = () => {
  return createDBConnection;
};
