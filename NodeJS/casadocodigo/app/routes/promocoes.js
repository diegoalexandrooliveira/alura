module.exports = app => {
    app.get("/promocoes/novo", (req, res) => {
        let conexao = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(conexao);
        produtosDAO.lista((erro, resultados) => {
            if (erro) {
                console.log(erro);
            } else {
                res.render("promocoes/form", {
                    lista: resultados
                });
            }
        });
        conexao.end();
    });

    app.post("/promocoes", (req, res) => {
        let promocao = req.body;
        console.log(promocao);

        app.get("io").emit("novaPromocao", promocao);
        res.redirect("promocoes/novo");
    });
};