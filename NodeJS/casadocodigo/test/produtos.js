// let http = require("http");
// let assert = require("assert");

// describe('#ProdutosController', () => {
//     it('#listagem json', (done) => {
//         let configuracoes = {
//             hostname: "localhost",
//             port: 3000,
//             path: "/produtos",
//             headers: {
//                 'Accept': 'application/json'
//             }
//         };
//         http.get(configuracoes, (res) => {
//             assert.equal(res.statusCode,200);

//             assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

//             done();
//         });
//     });
// });

let express = require("../config/express")();
let request = require("supertest")(express);

describe('#ProdutosController', () => {

    beforeEach(done => {
        var conexao = express.infra.connectionFactory();
        conexao.query("delete from produtos", (erro, resultado) => {
            if (erro) {
                console.log(erro);
            } else {
                done();
            }
        });
    });

    it('#listagem json', (done) => {
        request.get("/produtos")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
    it("#listagem html", (done) => {
        request.get("/produtos")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)
            .expect(200, done);
    });

    it("#cadastro de produto com dados inválidos", (done) => {
        request.post("/produtos")
            .send({
                titulo: "",
                descricao: "livro teste"
            })
            .expect(400, done);
    });

    it("#cadastro de produto com dados válidos", (done) => {
        request.post("/produtos")
            .send({
                titulo: "livro teste",
                descricao: "livro teste",
                preco: 1.25
            })
            .expect(302, done);
    });
});