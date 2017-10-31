import { Negociacao } from './Negociacao';
import { MeuObjeto } from './MeuObjeto';
export class Negociacoes implements MeuObjeto<Negociacoes> {
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

  equals(negociacoes: Negociacoes): boolean {
    return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes);
  }

}
