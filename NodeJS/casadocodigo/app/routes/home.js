module.exports = app => {
  app.get("/", (req, res, next) => {
    let conexao = app.infra.connectionFactory();
    let produtosDAO = new app.infra.ProdutosDAO(conexao);
    produtosDAO.lista((erros, resultados) => {
      if (erros) {
        console.log(erros);
        next(erros);
      } else {
        res.render("home/index", {
          livros: resultados
        });
      }
    });
    conexao.end();
  });
};
