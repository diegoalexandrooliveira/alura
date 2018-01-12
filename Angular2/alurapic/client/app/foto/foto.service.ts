import { Http, Headers, Response } from "@angular/http";
import { FotoComponent } from "./foto.component";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class FotoService {
  http: Http;
  headers: Headers;
  url: string;

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.url = "http://" + window.location.hostname + ":3000";
  }
  cadastrar(foto: FotoComponent): Observable<MensagemCadastro> {
    if (foto._id) {
      return this.http
        .put(this.url + "/v1/fotos/" + foto._id, JSON.stringify(foto), {
          headers: this.headers
        })
        .map(() => new MensagemCadastro("Foto alterada com sucesso", false));
    } else {
      return this.http
        .post(this.url + "/v1/fotos", JSON.stringify(foto), {
          headers: this.headers
        })
        .map(() => new MensagemCadastro("Foto incluida com sucesso", true));
    }
  }

  lista(): Observable<FotoComponent[]> {
    return this.http.get(this.url + "/v1/fotos").map(res => res.json());
  }

  remover(id: string): Observable<MensagemCadastro> {
    return this.http
      .delete(this.url + "/v1/fotos/" + id)
      .map(() => new MensagemCadastro("Foto excluída com sucesso.", undefined));
  }

  recuperaPeloId(id: string): Observable<FotoComponent> {
    return this.http.get(this.url + "/v1/fotos/" + id).map(res => res.json());
  }
}

export class MensagemCadastro {
  constructor(private _mensagem: string, private _inclusao: boolean) {
    this._mensagem = _mensagem;
    this._inclusao = _inclusao;
  }

  public get mensagem(): string {
    return this._mensagem;
  }

  public get inclusao(): boolean {
    return this._inclusao;
  }
}
