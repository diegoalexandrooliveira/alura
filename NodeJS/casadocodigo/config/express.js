let express = require("express");
let bodyParser = require("body-parser");
let load = require("express-load");
let expressValidator = require("express-validator");

module.exports = () => {
  let app = express();

  app.use(express.static("./app/public"));
  app.set("view engine", "ejs");
  app.set("views", "./app/views");
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  // express-validator
  app.use(expressValidator());

  // middleware personalizado

  load("routes", {
    cwd: "app"
  })
    .then("infra")
    .into(app);

  app.use((req, res, next) => {
    res.status(404).render("erros/404");
    next();
  });
  app.use((error, req, res, next) => {
      if(process.env.NODE_ENV == 'production'){
          res.status(500).render("erros/500");
          return;
      }
    next(error);
  });
  return app;
};
