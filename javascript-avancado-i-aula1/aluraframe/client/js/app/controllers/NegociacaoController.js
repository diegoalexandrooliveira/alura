'use strict';

System.register(['../models/ListaNegociacoes', '../models/Negociacao', '../models/Mensagem', '../views/NegociacoesView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/Bind', '../helpers/DateHelper'], function (_export, _context) {
  "use strict";

  var ListaNegociacoes, Negociacao, Mensagem, NegociacoesView, MensagemView, NegociacaoService, Bind, DateHelper, _createClass, NegociacaoController, negociacaoController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_modelsListaNegociacoes) {
      ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }, function (_modelsMensagem) {
      Mensagem = _modelsMensagem.Mensagem;
    }, function (_viewsNegociacoesView) {
      NegociacoesView = _viewsNegociacoesView.NegociacoesView;
    }, function (_viewsMensagemView) {
      MensagemView = _viewsMensagemView.MensagemView;
    }, function (_servicesNegociacaoService) {
      NegociacaoService = _servicesNegociacaoService.NegociacaoService;
    }, function (_helpersBind) {
      Bind = _helpersBind.Bind;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.DateHelper;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      NegociacaoController = function () {
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

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

        _createClass(NegociacaoController, [{
          key: '_init',
          value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacoes.adiciona(negociacao);
              });
            }).catch(function (erro) {
              console.log(erro);
              _this._mensagem.texto = erro;
            });

            setInterval(function () {
              return _this.importaNegociacoes();
            }, 3000);
          }
        }, {
          key: 'adiciona',
          value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();
            var negociacao = this._criaNegociacao();
            this._service.cadastrar(negociacao).then(function (mensagem) {
              _this2._listaNegociacoes.adiciona(negociacao);
              _this2._limparFormulario();
              _this2._mensagem.texto = mensagem;
            }).catch(function (erro) {
              return _this2._mensagem.texto = erro;
            });

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
        }, {
          key: 'importaNegociacoes',
          value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
              negociacoes.forEach(function (negociacao) {
                return _this3._listaNegociacoes.adiciona(negociacao);
              });
              _this3._mensagem.texto = "Negociações importadas com sucesso.";
            }).catch(function (erro) {
              return _this3._mensagem.texto = erro;
            });

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
        }, {
          key: '_criaNegociacao',
          value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
          }
        }, {
          key: '_limparFormulario',
          value: function _limparFormulario() {
            this._inputData.value = "";
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
          }
        }, {
          key: 'apaga',
          value: function apaga() {
            var _this4 = this;

            this._service.apagaTodos().then(function (mensagem) {
              _this4._mensagem.texto = mensagem;
              _this4._listaNegociacoes.esvazia();
            }).catch(function (erro) {
              return _this4._mensagem.texto = erro;
            });
          }
        }, {
          key: 'ordena',
          value: function ordena(coluna) {
            if (coluna == this._ordemAtual) {
              this._listaNegociacoes.inverteOrdem();
            } else {
              this._listaNegociacoes.ordena(function (a, b) {
                return a[coluna] - b[coluna];
              });
            }
            this._ordemAtual = coluna;
          }
        }]);

        return NegociacaoController;
      }();

      negociacaoController = new NegociacaoController();
      function currentInstance() {
        return negociacaoController;
      }

      _export('currentInstance', currentInstance);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map