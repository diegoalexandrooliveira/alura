module.exports = (app) => {
    app.get("/pagamentos", (request, response) => {
        console.log("Funcionou");
        response.send("Funcionou");
    });

    app.delete("/pagamentos/pagamento/:id", (request, response) => {
        let pagamento = {
            id: request.params.id,
            status: "CANCELADO"
        };

        let conexao = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(conexao);

        pagamentoDAO.atualiza(pagamento, (erro) => {
            if (erro) {
                response.status(500).send(erro);
                return;
            }
            response.status(204).send(pagamento);
        });
        conexao.end();

    });

    app.put("/pagamentos/pagamento/:id", (request, response) => {
        let pagamento = {};
        let id = request.params.id;

        pagamento.id = id;
        pagamento.status = "CONFIRMADO";

        let conexao = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(conexao);

        pagamentoDAO.atualiza(pagamento, (erro) => {
            if (erro) {
                response.status(500).send(erro);
                return;
            }
            response.send(pagamento);
        });
        conexao.end();

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
                pagamento.id = resultado.insertId;
                response.location("/pagamentos/pagamento/" + pagamento.id);
                let resposta = {
                    dados_do_pagamento: pagamento,
                    links: [{
                            href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                            rel: "confirmar",
                            method: "PUT"
                        },
                        {
                            href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                            rel: "cancelar",
                            method: "DELETE"
                        }
                    ]
                };
                response.status(201).json(resposta);
            }
        });
        conexao.end();
    });
}