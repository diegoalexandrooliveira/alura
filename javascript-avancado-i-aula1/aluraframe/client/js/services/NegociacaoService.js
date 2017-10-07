class NegociacaoService {

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

      this._http.get("negociacoes/semana").then(negociacoes =>
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

}
