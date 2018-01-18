let express = require("express");
let bodyParser = require("body-parser");
let load = require("express-load");


module.exports = () => {
    let app = express();

    app.set("view engine", "ejs");
    app.set("views", "./app/views");
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    load('routes', {
        cwd: 'app'
    }).then('infra').into(app);

    return app;
}