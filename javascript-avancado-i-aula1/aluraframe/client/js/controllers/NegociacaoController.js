class NegociacaoController {

  constructor() {
    this.$ = document.querySelector.bind(document);
    this._inputData = this.$("#data");
    this._inputQuantidade = this.$("#quantidade");
    this._inputValor = this.$("#valor");


    this._listaNegociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView(this.$("#negociacoesView"));
    this._negociacoesView.update(this._listaNegociacoes);

    // this._listaNegociacoes = new ListaNegociacoes(function(model) {
    //   this._negociacoesView.update(model);
    // }.bind(this));
    // estou usando bind, mas dá pra usar o Reflect.apply, ele pede a função que quero executar
    // e qual o contexto que essa função deve ser executada
    //  Dá pra usar a arrow function, o this da => não é dinâmico


    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView(this.$("#mensagemView"));
  }

  adiciona(event) {
    // expressão regular /-/g
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limparFormulario();
    this._mensagem.texto = "Negociação adicionada com sucesso";
    this._mensagemView.update(this._mensagem);
  }

  _criaNegociacao() {
    return new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value,
      this._inputValor.value);
  }

  _limparFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = "Negociações apagadas com sucesso.";
    this._mensagemView.update(this._mensagem);
  }

}
