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
    res.render("produtos/form", {
      errosValidacao: {},
      produto: {}
    });
  });

  app.post("/produtos", (req, res) => {
    let produto = req.body;

    // inicio express-validator
    req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('preco', 'Preço com formato inválido').isFloat();
    let erros = req.validationErrors();
    if (erros) {
      console.log(erros);

      res.format({
        html: () => {
          res.status(400).render('produtos/form', {
            errosValidacao: erros,
            produto: produto
          });
        },
        json: () => {
          res.status(400).json(erros);
        }
      });

      return;
    }
    // fim express-validator

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