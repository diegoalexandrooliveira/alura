let app = require("./config/express")();
let http = require("http").Server(app);
let socket = require("socket.io")(http);

let porta = process.env.PORT || 3000;

app.set("io", socket);

http.listen(porta, () => {
  console.log("Rodando na porta " + porta);
});
