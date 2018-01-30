let restify = require("restify-clients");
let _client;

function CartoesClient() {
  this._client = restify.createJsonClient({
    url: "http://localhost:3001/"
  });
}

CartoesClient.prototype.autoriza = function(cartao, callBack) {
  this._client.post("/cartoes/autoriza", cartao, callBack);
};

module.exports = () => {
  return CartoesClient;
};
