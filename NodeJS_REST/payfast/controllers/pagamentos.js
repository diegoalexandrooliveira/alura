module.exports = app => {
  app.get("/pagamentos/pagamento/:id", (request, response) => {
    let id = request.params.id;
    let conexao = app.persistencia.connectionFactory();
    let pagamentoDAO = new app.persistencia.PagamentoDAO(conexao);

    pagamentoDAO.buscaPorId(id, (erro, resultado) => {
      if (erro) {
        console.log(erro);
        response.status(500).send(erro);
        return;
      }
      response.json(resultado);
    });
    conexao.end();
  });

  app.delete("/pagamentos/pagamento/:id", (request, response) => {
    let pagamento = {
      id: request.params.id,
      status: "CANCELADO"
    };

    let conexao = app.persistencia.connectionFactory();
    let pagamentoDAO = new app.persistencia.PagamentoDAO(conexao);

    pagamentoDAO.atualiza(pagamento, erro => {
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

    pagamentoDAO.atualiza(pagamento, erro => {
      if (erro) {
        response.status(500).send(erro);
        return;
      }
      response.send(pagamento);
    });
    conexao.end();
  });

  app.post("/pagamentos/pagamento", (request, response) => {
    request
      .assert(
        "pagamento.forma_de_pagamento",
        "Forma de pagamento é obrigatória"
      )
      .notEmpty();
    request
      .assert("pagamento.valor", "Valor é obrigatório e deve ser um número")
      .notEmpty()
      .isFloat();

    let errosValidacao = request.validationErrors();

    if (errosValidacao) {
      console.log(errosValidacao);
      response.status(400).send(errosValidacao);
      return;
    }

    let pagamento = request.body["pagamento"];
    pagamento.status = "CRIADO";
    pagamento.data = new Date();

    let conexao = app.persistencia.connectionFactory();
    let pagamentoDAO = new app.persistencia.PagamentoDAO(conexao);

    pagamentoDAO.inserir(pagamento, (erro, resultado) => {
      if (erro) {
        response.status(400).send(erro);
        return;
      }
      pagamento.id = resultado.insertId;
      if (pagamento.forma_de_pagamento == "cartao") {
        let cartao = request.body["cartao"];

        let clienteCartoes = new app.servicos.clienteCartoes();
        clienteCartoes.autoriza(cartao, (erroCartao, req, res, retorno) => {
          if (erroCartao) {
            console.log(erroCartao);
            response.status(400).send(erroCartao);
            return;
          }
          console.log(retorno);
          response.status(201).send(retorno);
        });
      } else {
        response.location("/pagamentos/pagamento/" + pagamento.id);
        let resposta = {
          dados_do_pagamento: pagamento,
          links: [
            {
              href:
                "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
              rel: "confirmar",
              method: "PUT"
            },
            {
              href:
                "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
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
};
