module.exports = app => {
    app.get('/produtos', (req, res) => {
        let conexao = app.infra.connectionFactory();
        conexao.query("select * from livros", (erro, resultados) => {
            res.render('produtos/lista', {
                lista: resultados
            });
        });
        conexao.end();
    });
};