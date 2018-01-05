import { Component } from "@angular/core";
import { Http } from "@angular/http";

@Component({
  moduleId: module.id,
  selector: "app",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  fotos: Object[] = [];
  constructor(http: Http) {
    http.get("http://localhost:3001/v1/fotos").subscribe(res => {
      this.fotos = res.json();
      console.log(this.fotos);
    });
  }
}
