"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var foto_component_1 = require("./foto.component");
var FotoService = (function () {
    function FotoService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append("Content-Type", "application/json");
        this.servidor = "http://" + window.location.hostname + ":3000";
    }
    FotoService.prototype.cadastrar = function (foto) {
        this.http
            .post(this.servidor + "/v1/fotos", JSON.stringify(foto), {
            headers: this.headers
        })
            .subscribe(function () {
            foto = new foto_component_1.FotoComponent();
            console.log("Foto salva com sucesso");
        }, function (erro) { return console.log(erro); });
    };
    FotoService.prototype.lista = function () {
        return new Array();
    };
    return FotoService;
}());
exports.FotoService = FotoService;
//# sourceMappingURL=foto.service.js.map