import { Negociacao, Negociacoes } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
import { domInject } from '../helpers/decorators/index';
export class NegociacaoController {

  @domInject('#data')
  private _inputData: JQuery;
  @domInject('#quantidade')
  private _inputQuantidade: JQuery;
  @domInject('#valor')
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView', true);
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    // this._inputData = $("#data");
    // this._inputQuantidade = $("#quantidade");
    // this._inputValor = $("#valor");
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    // const t1 = performance.now();
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

    // const t2 = performance.now();

    // console.log(t2-t1)
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
