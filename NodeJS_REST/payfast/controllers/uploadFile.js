let fs = require("fs");


module.exports = (app) => {

    app.post("/upload/imagem", (req, res) => {
        let nomeArquivo = req.headers.filename;
        req.pipe(fs.createWriteStream("./util/" + nomeArquivo))
            .on("finish", () => {
                res.send("Imagem subida com sucesso");
            });
    });


    // Exemplo para apenas ler o body sem gravar em lugar nenhum
    app.post("/upload/imagemSemGravar", (req, res) => {
        var response = [];
        req.on("data", (chunk) => {
            response.push(chunk);
        });
        req.on("end", () => {
            var res2 = Buffer.concat(response);
            console.log(res2);
            res.send(response);
        });
    });
};