var api = require("../api"),
  path = require("path");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
  });
  app
    .route("/v1/fotos")
    .post(api.adiciona)
    .get(api.lista);

  app
    .route("/v1/fotos/:fotoId")
    .delete(api.remove)
    .get(api.busca)
    .put(api.atualiza);

  app.get("/v1/grupos", api.listaGrupos);
  app.get("/v1/fotos/grupo/:grupoId", api.listaPorGrupo);

  // app.all("/*", function(req, res) {
  //   res.sendFile(path.join(app.get("clientPath"), "index.html"));
  // });
};
