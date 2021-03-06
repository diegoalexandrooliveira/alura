import {
  ListaNegociacoes
} from '../models/ListaNegociacoes';
import {
  Negociacao
} from '../models/Negociacao';
import {
  Mensagem
} from '../models/Mensagem';
import {
  NegociacoesView
} from '../views/NegociacoesView';
import {
  MensagemView
} from '../views/MensagemView';
import {
  NegociacaoService
} from '../services/NegociacaoService';
import {
  Bind
} from '../helpers/Bind';
import {
  DateHelper
} from '../helpers/DateHelper';

class NegociacaoController {

  constructor() {
    this.$ = document.querySelector.bind(document);
    this._inputData = this.$("#data");
    this._inputQuantidade = this.$("#quantidade");
    this._inputValor = this.$("#valor");

    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView(this.$("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

    this._mensagem = new Bind(new Mensagem(), new MensagemView(this.$("#mensagemView")), 'texto');

    this._ordemAtual = '';

    this._service = new NegociacaoService();

    this._init();

    // ConnectionFactory.getConnection()
    //   .then(connection => {
    //     new NegociacaoDAO(connection)
    //       .listaTodos()
    //       .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)));
    //   });


    // this._listaNegociacoes = new ListaNegociacoes(function(model) {
    //   this._negociacoesView.update(model);
    // }.bind(this));
    // estou usando bind, mas dá pra usar o Reflect.apply, ele pede a função que quero executar
    // e qual o contexto que essa função deve ser executada
    //  Dá pra usar a arrow function, o this da => não é dinâmico


  }

  _init() {
    this._service.lista()
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
          this._listaNegociacoes.adiciona(negociacao)))
      .catch(erro => {
        console.log(erro);
        this._mensagem.texto = erro;
      });

    setInterval(() => this.importaNegociacoes(), 3000);
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = this._criaNegociacao();
    this._service.cadastrar(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._limparFormulario();
        this._mensagem.texto = mensagem;
      })
      .catch(erro => this._mensagem.texto = erro);

    // ConnectionFactory
    //   .getConnection()
    //   .then(connection => {
    //     let negociacao = this._criaNegociacao();
    //     new NegociacaoDAO(connection)
    //       .adiciona(negociacao)
    //       .then(() => {
    //         this._listaNegociacoes.adiciona(this._criaNegociacao());
    //         this._limparFormulario();
    //         this._mensagem.texto = "Negociação adicionada com sucesso";
    //       });
    //   })
    //   .catch(erro => this._mensagem.texto = erro);
  }


  importaNegociacoes() {

    this._service.importa(this._listaNegociacoes.negociacoes)
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = "Negociações importadas com sucesso."
      })
      .catch(erro => this._mensagem.texto = erro);

    // Promise.all([service.obterNegociacoesDaSemana(), service.obterNegociacoesDaSemanaPassada(),
    //     service.obterNegociacoesDaSemanaRetrasada()
    //   ]).then(arrayNegociacoes => {
    //     arrayNegociacoes
    //       .reduce((arrayRetorno, array) => arrayRetorno.concat(array), [])
    //       .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
    //     this._mensagem.texto = "Negociações importadas com sucesso."
    //   })
    //   .catch(erro => this._mensagem.texto = erro);

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

    this._service.apagaTodos()
      .then(mensagem => {
        this._mensagem.texto = mensagem;
        this._listaNegociacoes.esvazia();
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  ordena(coluna) {
    if (coluna == this._ordemAtual) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }


}

let negociacaoController = new NegociacaoController();
export function currentInstance() {
  return negociacaoController;
}
