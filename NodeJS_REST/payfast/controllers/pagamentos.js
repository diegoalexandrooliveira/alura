module.exports = (app) => {
    app.get("/pagamentos", (request, response) => {
        console.log("Funcionou");
        response.send("Funcionou");
    });


    app.post("/pagamentos/pagamento", (request, response) => {

        request.assert("forma_de_pagamento", "Forma de pagamento é obrigatória").notEmpty();
        request.assert("valor", "Valor é obrigatório e deve ser um número").notEmpty().isFloat();

        let errosValidacao = request.validationErrors();

        if (errosValidacao) {
            console.log(errosValidacao);
            response.status(400).send(errosValidacao);
            return;
        }

        let pagamento = request.body;
        pagamento.status = "CRIADO";
        pagamento.data = new Date;

        let conexao = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(conexao);

        pagamentoDAO.inserir(pagamento, (erro, resultado) => {
            if (erro) {
                response.status(400).send(erro);
            } else {
                response.location("/pagamentos/pagamento/" + resultado.insertId);
                response.status(201).json(pagamento);
            }
        });
        conexao.end();
    });
}