let soap = require("soap");

function CorreiosSOAPClient() {
  this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
  // this._url = "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";
}

module.exports = () => {
  return CorreiosSOAPClient;
};
CorreiosSOAPClient.prototype.calculaPrazo = function (args, callBack) {
  soap.createClient(
    this._url,
    (erro, client) => {
      if (erro) {
        console.log(erro);
        return;
      }
      console.log("Cliente SOAP criado.");
      client.CalcPrazo(args, callBack);
      // client.consultaCEP({
      //   cep: "19813178"
      // }, callBack);
    }
  );
};