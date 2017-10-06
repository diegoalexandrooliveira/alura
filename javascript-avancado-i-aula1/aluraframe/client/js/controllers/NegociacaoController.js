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

    let service = new NegociacaoService();

    Promise.all([service.obterNegociacoesDaSemana(), service.obterNegociacoesDaSemanaPassada(),
        service.obterNegociacoesDaSemanaRetrasada()
      ]).then(arrayNegociacoes => {
        arrayNegociacoes
          .reduce((arrayRetorno, array) => arrayRetorno.concat(array), [])
          .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        this._mensagem.texto = "Negociações importadas com sucesso."
      })
      .catch(erro => this._mensagem.texto = erro);

    // service.obterNegociacoesDaSemana()
    // .then(negociacoes => {
    //     negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    //     this._mensagem.texto = "Negociações importadas com sucesso.";
    //   })
    //   .catch(erro => this._mensagem.texto = erro);
    // service.obterNegociacoesDaSemanaPassada()
    // .then(negociacoes => {
    //     negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    //     this._mensagem.texto = "Negociações importadas com sucesso.";
    //   })
    //   .catch(erro => this._mensagem.texto = erro);
    // service.obterNegociacoesDaSemanaRetrasada()
    // .then(negociacoes => {
    //     negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    //     this._mensagem.texto = "Negociações importadas com sucesso.";
    //   })
    //   .catch(erro => this._mensagem.texto = erro);

    // service.obterNegociacoesDaSemana((erro, negociacoes) => {
    //   if (erro) {
    //     this._mensagem.texto = erro
    //     return;
    //   } else {
    //     negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    //     this._mensagem.texto = "Negociações importadas com sucesso."
    //   }
    // });

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
