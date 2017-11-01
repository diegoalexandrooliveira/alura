import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../service/index';
import { imprime } from '../helpers/index';

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
  private _negociacaoService = new NegociacaoService();

  constructor() {
    // this._inputData = $("#data");
    // this._inputQuantidade = $("#quantidade");
    // this._inputValor = $("#valor");
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
  adiciona() {
    // const t1 = performance.now();
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
    // this._negociacoes.paraTexto();
    // const t2 = performance.now();
    imprime(negociacao, this._negociacoes);

    // console.log(t2-t1)
  }

  private diaUtil(data: Date): boolean {
    return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
  }


  @throttle()
  async importaDados(event: Event) {
    try {
      let negociacoesRecuperadas = await this._negociacaoService.obterNegociacoes((res: Response) => {
        if (res.ok) {
          return res;
        } else {
          throw new Error(res.statusText);
        }
      });
      let negociacoesJaImportadas = this._negociacoes.paraArray();

      negociacoesRecuperadas
        .filter(negociacao =>
          !negociacoesJaImportadas.some(negociacaoExistente =>
            negociacao.equals(negociacaoExistente)))
        .forEach(negociacao => this._negociacoes.adiciona(negociacao));
      this._negociacoesView.update(this._negociacoes);
    }
    catch (error) {
      this._mensagemView.update(error.message);
    }

    // this._negociacaoService.obterNegociacoes((res: Response) => {
    //   if (res.ok) {
    //     return res;
    //   } else {
    //     throw new Error(res.statusText);
    //   }
    // })
    //   .then(negociacoesRecuperadas => {
    //     let negociacoesJaImportadas = this._negociacoes.paraArray();
    //
    //     negociacoesRecuperadas
    //       .filter(negociacao =>
    //         !negociacoesJaImportadas.some(negociacaoExistente =>
    //           negociacao.equals(negociacaoExistente)))
    //       .forEach(negociacao => this._negociacoes.adiciona(negociacao));
    //     this._negociacoesView.update(this._negociacoes);
    //     // this._negociacoes.paraTexto();
    //   })
    //   .catch(error => this._mensagemView.update(error.message));


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
