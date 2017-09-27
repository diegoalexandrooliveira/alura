class NegociacoesView {
  constructor(elemento) {
    this._elemento = elemento;
  }

  _template(listaNegociacoes) {
    return `
    <table class="table table-hover table-bordered">
    <thead>
    <tr>
    <th>DATA</th>
    <th>QUANTIDADE</th>
    <th>VALOR</th>
    <th>VOLUME</th>
    </tr>
    </thead>

    <tbody>
    ${listaNegociacoes.negociacoes.map(negociacao =>
      `<tr>
          <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
          <td>${negociacao.quantidade}</td>
          <td>${negociacao.valor}</td>
          <td>${negociacao.volume}</td>
      </tr>`).join('')}
    </tbody>

    <tfoot>
    </tfoot>
    </table>`;
  }

  update(listaNegociacoes) {
    this._elemento.innerHTML = this._template(listaNegociacoes);

  }
}
