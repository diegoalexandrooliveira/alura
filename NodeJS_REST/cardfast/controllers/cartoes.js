module.exports = (app) => {

    app.post("/cartoes/autoriza", (request, response) => {

        request.assert("numero", "Número é obrigatório e deve ter 16 caracteres.").notEmpty().len(16, 16);
        request.assert("bandeira", "Bandeira do cartão é obrigatória").notEmpty();
        request.assert("ano_de_expiracao", "Ano de expiração é obrigatório e deve ter 4 caracteres").notEmpty().len(4, 4);
        request.assert("mes_de_expiracao", "Mês de expiração é obrigatório e deve ter 2 caracteres").notEmpty().len(2, 2);
        request.assert("cvv", "CVV é obrigatório e deve conter 3 caracteres").notEmpty().len(3, 3);

        let errosValidacao = request.validationErrors();

        if (errosValidacao) {
            console.log(errosValidacao);
            response.status(400).send(errosValidacao);
            return;
        }

        let cartao = request.body;
        cartao.status = "AUTORIZADO";

        response.status(201).json({
            dados_do_cartao: cartao
        });
        return;
    });
}