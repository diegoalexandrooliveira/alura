'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDAO', '../models/Negociacao'], function (_export, _context) {
  "use strict";

  var HttpService, ConnectionFactory, NegociacaoDAO, Negociacao, _createClass, NegociacaoService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_HttpService) {
      HttpService = _HttpService.HttpService;
    }, function (_ConnectionFactory) {
      ConnectionFactory = _ConnectionFactory.ConnectionFactory;
    }, function (_daoNegociacaoDAO) {
      NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
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

      _export('NegociacaoService', NegociacaoService = function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        _createClass(NegociacaoService, [{
          key: 'obterNegociacoes',
          value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaPassada(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (semanas) {
              var negociacoes = semanas.reduce(function (retorno, semana) {
                return retorno.concat(semana);
              }, []);
              return negociacoes;
            }).catch(function (erro) {
              throw new Error(erro);
            });
          }
        }, {
          key: 'obterNegociacoesDaSemana',
          value: function obterNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {

              _this._http.get("negociacoes/semana").then(function (negociacoes) {
                return resolve(negociacoes.map(function (objeto) {
                  return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                }));
              }).catch(function (erro) {
                console.log(erro);
                reject("Não foi possível importar as negociações da semana");
              });
            });
          }
        }, {
          key: 'obterNegociacoesDaSemanaPassada',
          value: function obterNegociacoesDaSemanaPassada() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

              _this2._http.get("negociacoes/anterior").then(function (negociacoes) {
                return resolve(negociacoes.map(function (objeto) {
                  return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                }));
              }).catch(function (erro) {
                console.log(erro);
                reject("Não foi possível importar as negociações da semana passada");
              });
            });
          }
        }, {
          key: 'obterNegociacoesDaSemanaRetrasada',
          value: function obterNegociacoesDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

              _this3._http.get("negociacoes/retrasada").then(function (negociacoes) {
                return resolve(negociacoes.map(function (objeto) {
                  return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                }));
              }).catch(function (erro) {
                console.log(erro);
                reject("Não foi possível importar as negociações da semana retrasada");
              });
            });
          }
        }, {
          key: 'cadastrar',
          value: function cadastrar(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDAO(connection);
            }).then(function (dao) {
              return dao.adiciona(negociacao);
            }).then(function () {
              return 'Negociação adicionada com sucesso.';
            }).catch(function () {
              console.log(erro);
              throw new Error('Não foi possível adicionar a negociação.');
            });
          }
        }, {
          key: 'lista',
          value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDAO(connection);
            }).then(function (dao) {
              return dao.listaTodos();
            }).catch(function (erro) {
              console.log(erro);
              throw new Error('Não foi possível obter as negociacões.');
            });
          }
        }, {
          key: 'apagaTodos',
          value: function apagaTodos() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDAO(connection);
            }).then(function (dao) {
              return dao.apagaTodos();
            }).then(function () {
              return 'Negociações apagadas com sucesso.';
            }).catch(function (erro) {
              console.log(erro);
              throw new Error('Não foi possível apagar as negociações.');
            });
          }
        }, {
          key: 'importa',
          value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
              return negociacoes.filter(function (negociacao) {
                return !listaAtual.some(function (negociacaoLista) {
                  return JSON.stringify(negociacaoLista) == JSON.stringify(negociacao);
                });
              });
            }).catch(function (erro) {
              console.log(erro);
              throw new Error('Não foi possível importar as negociações');
            });
          }
        }]);

        return NegociacaoService;
      }());

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map