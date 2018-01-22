let app = require("./config/express")();
let http = require("http").Server(app);
let socket = require("socket.io")(http);

const porta = 3000;

app.set("io", socket);

http.listen(porta, () => {
    console.log("Rodando na porta " + porta);
});