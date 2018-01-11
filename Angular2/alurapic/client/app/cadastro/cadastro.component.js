"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var foto_component_1 = require("../foto/foto.component");
var forms_1 = require("@angular/forms");
var foto_service_1 = require("../foto/foto.service");
var router_1 = require("@angular/router");
var CadastroComponent = (function () {
    function CadastroComponent(formBuilder, service, route, router) {
        var _this = this;
        this.foto = new foto_component_1.FotoComponent();
        this.mensagem = '';
        this.meuForm = formBuilder.group({
            titulo: [
                "",
                forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])
            ],
            url: ["", forms_1.Validators.required],
            descricao: [""]
        });
        this.service = service;
        this.route = route;
        this.router = router;
        this.route.params.subscribe(function (params) {
            var id = params["id"];
            if (id) {
                console.log(id);
                _this.service
                    .recuperaPeloId(id)
                    .subscribe(function (foto) { return (_this.foto = foto); }, function (erro) { return console.log(erro); });
            }
        });
    }
    CadastroComponent.prototype.cadastrar = function (event) {
        var _this = this;
        event.preventDefault();
        this.service.cadastrar(this.foto).subscribe(function () {
            console.log("Foto incluida com sucesso.");
            if (_this.foto._id) {
                _this.router.navigate([""]);
            }
            else {
                _this.foto = new foto_component_1.FotoComponent();
            }
        }, function (erro) { return console.log("Erro ao incluir a foto. " + erro); });
    };
    return CadastroComponent;
}());
CadastroComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "cadastro",
        templateUrl: "./cadastro.component.html"
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        foto_service_1.FotoService,
        router_1.ActivatedRoute,
        router_1.Router])
], CadastroComponent);
exports.CadastroComponent = CadastroComponent;
//# sourceMappingURL=cadastro.component.js.map