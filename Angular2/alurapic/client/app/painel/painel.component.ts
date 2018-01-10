import { Component, Input, OnInit } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "painel",
  templateUrl: "./painel.component.html",
  styleUrls: ["./painel.component.css"]
})
export class PainelComponent implements OnInit {
  @Input() titulo: string;

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.titulo =
      this.titulo.length > 7 ? this.titulo.substr(0, 7) + "..." : this.titulo;
  }
}
