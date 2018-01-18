module.exports = app => {
  app.get("/produtos", (req, res) => {
    let conexao = app.infra.connectionFactory();
    let produtosDAO = new app.infra.ProdutosDAO(conexao);
    produtosDAO.lista((erro, resultados) => {
      res.format({
        html: () => res.render("produtos/lista", {
          lista: resultados
        }),
        json: () => res.json(resultados)
      });

    });
    conexao.end();
  });

  app.get("/produtos/novo", (req, res) => {
    res.render("produtos/form");
  });

  app.post("/produtos", (req, res) => {
    let produto = req.body;
    console.log(produto);

    let conexao = app.infra.connectionFactory();
    let produtosDAO = new app.infra.ProdutosDAO(conexao);
    produtosDAO.inserir(produto, erro => {
      console.log(erro);
      res.redirect("/produtos");
    });
    conexao.end();
  });

  app.delete("/produtos/:id", (req, res) => {
    let conexao = app.infra.connectionFactory();
    let produtosDAO = new app.infra.ProdutosDAO(conexao);
    produtosDAO.deletar(req.params.id, erro => {
      res.redirect("/produtos");
    });
    conexao.end();
  });
};