let express = require("express");
let consign = require("consign");
let bodyParser = require("body-parser");
let validator = require("express-validator");

module.exports = () => {
    let app = express();
    app.use(bodyParser.json());
    app.use(validator());
    consign().include("controllers")
        .then("persistencia")
        .into(app);
    return app;
};