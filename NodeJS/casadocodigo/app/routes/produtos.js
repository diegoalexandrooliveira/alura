module.exports = app => {
    app.get("/produtos", (req, res) => {
        let conexao = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(conexao);
        produtosDAO.lista((erro, resultados) => {
            res.render("produtos/lista", {
                lista: resultados
            });
        });
        conexao.end();
    });

    app.get("/produtos/novo", (req, res) => {
        res.render("produtos/form");
    });

    app.post("/produtos/salvar", (req, res) => {
        let produto = req.body;
        let conexao = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(conexao);
        produtosDAO.inserir(produto, (erro, resultados) => {
            res.redirect('/produtos');
        });
        conexao.end();
    });
};