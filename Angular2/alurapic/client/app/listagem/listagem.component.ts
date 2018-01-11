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
  constructor(service: FotoService) {
    this.service = service;
    this.listar();
  }

  listar(): void {
    this.service.lista().subscribe(
      fotos => {
        this.fotos = fotos;
      },
      erro => console.log(erro)
    );
  }

  remover(foto: FotoComponent) {
    this.service
      .remover(foto._id)
      .subscribe(
        () => console.log("Removido com sucesso"),
        erro => console.log("Erro " + erro)
      );
  }
}
