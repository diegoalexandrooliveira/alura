import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';

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


  @throttle()
  importaDados(event: Event) {
    function isOk(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    }
    fetch('http://localhost:8080/dados')
      .then(res => isOk(res))
      .then(res => res.json())
      .then((dados: NegociacaoParcial[]) => {
        dados
          .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
          .forEach(negociacao => this._negociacoes.adiciona(negociacao));
        this._negociacoesView.update(this._negociacoes);
      })
      .catch(error => {
        console.log(error.message);
        this._mensagemView.update("Problemas ao importar os dados");
      });
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
