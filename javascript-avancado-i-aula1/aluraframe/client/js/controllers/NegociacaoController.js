class NegociacaoController {

  constructor() {
    this.$ = document.querySelector.bind(document);
    this._inputData = this.$("#data");
    this._inputQuantidade = this.$("#quantidade");
    this._inputValor = this.$("#valor");
  }

  adiciona(event) {
    // expressão regular /-/g
    event.preventDefault();
    let data = this.converteData(this._inputData.value);
    let negociacao = new Negociacao(
      new Date(data[0], data[1], data[2]),
      this._inputQuantidade.value,
      this._inputValor.value);
    console.log(negociacao);
  }

  converteData(data) {
    let valores = data.split('-');
    if (valores.length != 3) {
      return null;
    }
    let retorno = [];
    for (let i = 0; i < 3; i++) {
      retorno.push(i != 1 ? Number(valores[i]) : Number(valores[i] - 1));
    }
    return retorno;
  }
}
