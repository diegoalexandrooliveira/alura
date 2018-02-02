let fs = require("fs");

fs.readFile("imagem.jpg", (erro, buffer) => {
    if (erro) {
        console.log(erro);
        return;
    }
    console.log("Arquivo lido");
    fs.writeFile("imagem2.jpg", buffer, (erroEscrita) => {
        if (erroEscrita) {
            console.log(erroEscrita);
            return;
        }
        console.log("Arquivo escrito");
    });

});