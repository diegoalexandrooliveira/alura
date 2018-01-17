let app = require("./config/express")();

let porta = 3000;

app.listen(porta, () => {
    console.log("Rodando na porta " + porta);
});