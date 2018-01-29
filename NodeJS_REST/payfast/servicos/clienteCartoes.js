let restify = require("restify-clients");

let client = restify.createJsonClient({
    url: "http://localhost:3001/"
});

client.post("/cartoes/autoriza", (erro, request, response, retorno) => {
    console.log("Chamou client");
    console.log(retorno);
});