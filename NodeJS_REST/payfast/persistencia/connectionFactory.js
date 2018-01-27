let mysql = require("mysql");

function createDBConnection() {
    return mysql.createConnection({
        host: "us-cdbr-iron-east-05.cleardb.net",
        user: "b1d0ff4f170764",
        password: "27ab6d6e",
        database: "heroku_2ae4a1333768240"
    });
}

// wrapper
module.exports = () => {
    return createDBConnection;
};