let http = require('http');
let express = require("express");
let porta = 3000;
let endereco = "localhost";

let server = http.createServer(function (req, res) {
    if (req.url == "/produtos") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Produtos</h1>');
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Home</h1>');
    }
});

server.listen(porta, endereco);

console.log("Servidor rodando em http://" + endereco + ":" + porta + "/");