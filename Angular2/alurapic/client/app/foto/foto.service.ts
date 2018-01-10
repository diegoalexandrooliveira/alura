import { Http, Headers } from "@angular/http";
import { FotoComponent } from "./foto.component";

export class FotoService {
  http: Http;
  headers: Headers;
  servidor: string;

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.servidor = "http://" + window.location.hostname + ":3000";
  }
  cadastrar(foto: FotoComponent): void {
    this.http
      .post(this.servidor + "/v1/fotos", JSON.stringify(foto), {
        headers: this.headers
      })
      .subscribe(
        () => {
          foto = new FotoComponent();
          console.log("Foto salva com sucesso");
        },
        erro => console.log(erro)
      );
  }

  lista(): FotoComponent[] {
    return new Array<FotoComponent>();
  }
}
