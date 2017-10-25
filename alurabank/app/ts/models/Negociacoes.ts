import { Negociacao } from './Negociacao';
export class Negociacoes {
  private _negociacoes: Negociacao[] = [];
  // private _negociacoes: Array<Negociacao> = [];

  public adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  paraArray(): Negociacao[] {
    return ([] as Negociacao[]).concat(this._negociacoes);
  }

}
