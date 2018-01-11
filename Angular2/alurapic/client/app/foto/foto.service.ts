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
  cadastrar(foto: FotoComponent): Observable<Response> {
    return this.http.post(this.url + "/v1/fotos", JSON.stringify(foto), {
      headers: this.headers
    });
  }

  lista(): Observable<FotoComponent[]> {
    return this.http.get(this.url + "/v1/fotos").map(res => res.json());
  }

  remover(id: string): Observable<Response> {
    return this.http.delete(this.url + "/v1/fotos/" + id);
  }
}
