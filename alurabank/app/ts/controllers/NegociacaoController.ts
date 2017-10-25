import { Negociacao, Negociacoes } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
export class NegociacaoController {

  private _inputData: JQuery;
  private _inputQuantidade: JQuery;
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView', true);
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();
    let data = new Date(this._inputData.val().replace(/-/g, ','));
    if (!this.diaUtil(data)) {
      this._mensagemView.update('Somento negociações em dias úteis');
      return;
    }
    const negociacao = new Negociacao(
      data,
      Number(this._inputQuantidade.val()),
      Number(this._inputValor.val())
    );
    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update("Negociação adicionada com sucesso.");

    this._negociacoes.paraArray()
      .forEach(negociacao => console.log(negociacao));
  }

  private diaUtil(data: Date): boolean {
    return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}
