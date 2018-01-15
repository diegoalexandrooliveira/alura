import { Component } from "@angular/core";
import { FotoComponent } from "../foto/foto.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FotoService } from "../foto/foto.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "cadastro",
  templateUrl: "./cadastro.component.html"
})
export class CadastroComponent {
  foto: FotoComponent = new FotoComponent();
  meuForm: FormGroup;
  service: FotoService;
  route: ActivatedRoute;
  router: Router;
  mensagem: string = "";

  constructor(
    formBuilder: FormBuilder,
    service: FotoService,
    route: ActivatedRoute,
    router: Router
  ) {
    this.meuForm = formBuilder.group({
      titulo: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      url: ["", Validators.required],
      descricao: [""]
    });
    this.service = service;
    this.route = route;
    this.router = router;
    this.route.params.subscribe(params => {
      let id = params["id"];
      if (id) {
        console.log(id);
        this.service
          .recuperaPeloId(id)
          .subscribe(foto => (this.foto = foto), erro => console.log(erro));
      }
    });
  }

  cadastrar(event: Event) {
    event.preventDefault();
    this.service.cadastrar(this.foto).subscribe(
      res => {
        this.mensagem = res.mensagem;
        this.foto = new FotoComponent();
        if (!res.inclusao) {
          this.router.navigate([""]);
        }
      },
      erro => {
        console.log("Erro ao incluir a foto. " + erro);
        this.mensagem = "Erro ao incluir a foto.";
      }
    );
  }
}
