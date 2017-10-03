class NegociacaoController {

  constructor() {
    this.$ = document.querySelector.bind(document);
    this._inputData = this.$("#data");
    this._inputQuantidade = this.$("#quantidade");
    this._inputValor = this.$("#valor");

    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView(this.$("#negociacoesView")), 'adiciona', 'esvazia');

    this._mensagem = new Bind(new Mensagem(), new MensagemView(this.$("#mensagemView")), 'texto');

    // this._listaNegociacoes = new ListaNegociacoes(function(model) {
    //   this._negociacoesView.update(model);
    // }.bind(this));
    // estou usando bind, mas dá pra usar o Reflect.apply, ele pede a função que quero executar
    // e qual o contexto que essa função deve ser executada
    //  Dá pra usar a arrow function, o this da => não é dinâmico


  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limparFormulario();
    this._mensagem.texto = "Negociação adicionada com sucesso";
  }


  importaNegociacoes() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "negociacoes/semana");

    xhr.onreadystatechange = () => {
      /*
      Estados de uma requisição
      0: requisição ainda não iniciada
      1: conexão com o servidor estabelecida
      2: requisição recebida
      3: processando requisição
      4: requisição concluída e a resposta está pronta
      */
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          JSON.parse(xhr.responseText).map(objeto =>
            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
          ).forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = "Negociações importadas com sucesso.";
        } else {
          console.log(xhr.responseText);
          this._mensagem.texto = "Não foi possivel recuperar as negociações.";
        }
      }
    };

    xhr.send();

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
  }


}
