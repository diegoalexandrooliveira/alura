module.exports = app => {
  app.get("/produtos", (req, res) => {
    let conexao = app.infra.connectionFactory();
    let produtosBanco = app.infra.produtosBanco(conexao);
    produtosBanco.lista((erro, resultados) => {
      res.render("produtos/lista", {
        lista: resultados
      });
    });
    conexao.end();
  });
};
