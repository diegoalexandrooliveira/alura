import { Component } from "@angular/core";
import { FotoComponent } from "../foto/foto.component";
import { Http, Headers } from "@angular/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "cadastro",
  templateUrl: "./cadastro.component.html"
})
export class CadastroComponent {
  foto: FotoComponent = new FotoComponent();
  http: Http;
  meuForm: FormGroup;

  constructor(http: Http, formBuilder: FormBuilder) {
    this.http = http;
    this.meuForm = formBuilder.group({
      titulo: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      url: ["", Validators.required],
      descricao: [""]
    });
  }

  cadastrar(event: Event) {
    event.preventDefault();
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.http
      .post(
        "http://" + window.location.hostname + ":3000/v1/fotos",
        JSON.stringify(this.foto),
        {
          headers: headers
        }
      )
      .subscribe(
        () => {
          this.foto = new FotoComponent();
          console.log("Foto salva com sucesso");
        },
        erro => console.log(erro)
      );
  }
}
