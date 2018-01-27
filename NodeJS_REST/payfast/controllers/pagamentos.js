module.exports = (app) => {
    app.get("/pagamentos", (request, response) => {
        console.log("Funcionou");
        response.send("Funcionou");
    });


    app.post("/pagamentos/pagamento", (request, response) => {
        let pagamento = request.body;
        pagamento.status = "CRIADO";
        pagamento.data = new Date;

        let conexao = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(conexao);

        pagamentoDAO.inserir(pagamento, (erro, resultado) => {
            if (erro) {
                response.status(500).send(erro);
            } else {
                response.json(pagamento);
            }
        });
        conexao.end();
    });
}