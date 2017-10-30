import { Negociacao } from './Negociacao';
import { Imprimivel } from './Imprimivel';
export class Negociacoes implements Imprimivel {
  private _negociacoes: Negociacao[] = [];
  // private _negociacoes: Array<Negociacao> = [];

  public adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  paraArray(): Negociacao[] {
    return ([] as Negociacao[]).concat(this._negociacoes);
  }

  paraTexto(): void {
    this._negociacoes.forEach(negociacao => negociacao.paraTexto());
  }

}
