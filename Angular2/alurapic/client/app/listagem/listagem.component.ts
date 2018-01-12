import { Component } from "@angular/core";
import { FotoService } from "../foto/foto.service";
import { FotoComponent } from "../foto/foto.component";

@Component({
  moduleId: module.id,
  selector: "listagem",
  templateUrl: "./listagem.component.html"
})
export class ListagemComponent {
  fotos: FotoComponent[] = [];
  service: FotoService;
  mensagem: string = "";

  constructor(service: FotoService) {
    this.service = service;
    this.listar();
  }

  listar(): void {
    this.service.lista().subscribe(
      fotos => {
        this.fotos = fotos;
      },
      erro => {
        console.log("Erro ao listar as fotos. " + erro);
        this.mensagem = "Não foi possível listar as fotos.";
      }
    );
  }

  remover(foto: FotoComponent) {
    this.service.remover(foto._id).subscribe(
      res => {
        let novasFotos = this.fotos.slice(0);
        novasFotos.splice(novasFotos.indexOf(foto), 1);
        this.fotos = novasFotos;
        this.mensagem = res.mensagem;
      },
      erro => {
        console.log("Erro " + erro);
        this.mensagem = "Não foi possível remover a foto.";
      }
    );
  }
}
