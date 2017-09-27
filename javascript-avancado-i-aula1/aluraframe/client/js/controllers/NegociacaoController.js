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
    let negociacao = this.criarNegociacao(this._inputData.value, this._inputQuantidade.value, this._inputValor.value);
    console.log(negociacao);
    this.limparCampos();
  }

  criarNegociacao(data, quantidade, valor) {
    return new Negociacao(
      new Date(...data.split('-')
        .map((itemArray, index) => index != 1 ? Number(itemArray) : Number(itemArray) - 1)
      ),
      quantidade,
      valor);
  }

  limparCampos() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;
    this._inputData.focus();
  }

}
