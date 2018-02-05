let memcached = require("memcached");

let client = new memcached("localhost:11211", {
  retries: 10,
  retry: 10000,
  remove: true
});

client.set("pagamento-11", { id: 11, pagamento: "teste" }, 60, erro => {
  if (erro) {
    console.log(erro);
    return;
  }
  console.log("Nova chave adicionada: 11");
});

client.get("pagamento-11", (erro, retorno) => {
  if (erro || !retorno) {
    console.log("MISS - chave não encontrada");
    return;
  }
  console.log("Hit - valor: " + JSON.stringify(retorno));
  return;
});
