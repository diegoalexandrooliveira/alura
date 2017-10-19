import {
  HttpService
} from './HttpService';
import {
  ConnectionFactory
} from './ConnectionFactory';
import {
  NegociacaoDAO
} from '../dao/NegociacaoDAO';
import {
  Negociacao
} from '../models/Negociacao';

export class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoes() {
    return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaPassada(),
        this.obterNegociacoesDaSemanaRetrasada()
      ])
      .then(semanas => {
        let negociacoes = semanas.reduce((retorno, semana) =>
          retorno.concat(semana), []);
        return negociacoes;
      })
      .catch(erro => {
        throw new Error(erro)
      });
  }


  obterNegociacoesDaSemana() {

    return new Promise((resolve, reject) => {

      this._http.get("negociacoes/semana")
        .then(negociacoes =>
          resolve(negociacoes.map(objeto =>
            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
        ).catch(erro => {
          console.log(erro);
          reject("Não foi possível importar as negociações da semana");
        })

    });
  }
  obterNegociacoesDaSemanaPassada() {
    return new Promise((resolve, reject) => {

      this._http.get("negociacoes/anterior").then(negociacoes =>
        resolve(negociacoes.map(objeto =>
          new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
      ).catch(erro => {
        console.log(erro);
        reject("Não foi possível importar as negociações da semana passada");
      })

    });
  }
  obterNegociacoesDaSemanaRetrasada() {

    return new Promise((resolve, reject) => {

      this._http.get("negociacoes/retrasada").then(negociacoes =>
        resolve(negociacoes.map(objeto =>
          new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
      ).catch(erro => {
        console.log(erro);
        reject("Não foi possível importar as negociações da semana retrasada");
      })

    });
  }

  cadastrar(negociacao) {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDAO(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociação adicionada com sucesso.')
      .catch(() => {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociação.')
      });
  }

  lista() {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDAO(connection))
      .then(dao => dao.listaTodos())
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociacões.')
      });
  }

  apagaTodos() {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDAO(connection))
      .then(dao => dao.apagaTodos())
      .then(() => 'Negociações apagadas com sucesso.')
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações.');
      });
  }

  importa(listaAtual) {
    return this.obterNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(negociacao =>
          !listaAtual.some(negociacaoLista =>
            JSON.stringify(negociacaoLista) == JSON.stringify(negociacao))))
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível importar as negociações');
      });
  }

}
