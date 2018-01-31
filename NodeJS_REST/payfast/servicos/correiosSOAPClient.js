let soap = require("soap");
let _cliente;

soap.createClient(
  "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl",
  (erro, client) => {
    this._cliente = client;
    console.log("Cliente SOAP criado.");
  }
);
