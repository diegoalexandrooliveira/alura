import { Component } from "@angular/core";
import { Http } from "@angular/http";

@Component({
  moduleId: module.id,
  selector: "listagem",
  templateUrl: "./listagem.component.html"
})
export class ListagemComponent {
  fotos: Object[] = [];
  constructor(http: Http) {
    // http.get("http://localhost:3001/v1/fotos").subscribe(res => {
    //   this.fotos = res.json();
    // });
    http
      .get("http://" + window.location.hostname + ":3000/v1/fotos")
      .map(res => res.json())
      .subscribe(
        fotosJson => (this.fotos = fotosJson),
        erro => console.log(erro)
      );
  }
}
