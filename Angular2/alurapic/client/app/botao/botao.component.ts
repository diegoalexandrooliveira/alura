import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "botao",
  templateUrl: "./botao.component.html"
})
export class BotaoComponent {
  @Input() nome: string = "Ok";
  @Input() estilo: string = "btn-default";
  @Input() tipo: string = "button";
  @Input() desabilitado: boolean = false;
  @Input() confirmacao: boolean = false;
  @Input() mensagemConfirmacao: string = "Deseja continuar?";
  @Output() acao = new EventEmitter();

  executaAcao() {
    if (this.confirmacao) {
      if (confirm(this.mensagemConfirmacao)) {
        this.acao.emit(null);
      } else {
        return;
      }
    } else {
      this.acao.emit(null);
    }
  }
}
