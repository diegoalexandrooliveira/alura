module.exports = (app) => {


    app.post("/correios/calculo-prazo", (req, res) => {
        let dados = req.body;

        let correiosSOAPClient = new app.servicos.correiosSOAPClient();
        console.log(correiosSOAPClient);


        correiosSOAPClient.calculaPrazo(dados, (erro, resultado) => {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log(resultado);
            res.status(200).json(resultado);
        });
    });
};