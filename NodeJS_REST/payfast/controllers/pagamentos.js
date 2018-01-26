module.exports = (app) => {
    app.get("/pagamentos", (request, response) => {
        console.log("Funcionou");
        response.send("Funcionou");
    });


    app.post("/pagamentos/pagamento", (request, response) => {
        let pagamento = request.body;
        console.log(pagamento);
        pagamento.status = "CRIADO";
        pagamento.data = new Date;
        response.send(pagamento);
    });
}