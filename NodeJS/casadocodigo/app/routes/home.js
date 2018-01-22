module.exports = (app) => {
    app.get("/", (req, res) => {
        let conexao = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(conexao);
        produtosDAO.lista((erros, resultados) => {
            if (erros) {
                console.log(erros);
                res.send(erros);
            } else {
                res.render("home/index", {
                    livros: resultados
                });
            }
        });
        conexao.end();
    });
}