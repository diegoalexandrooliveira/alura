class NegociacoesView extends View {

  template(listaNegociacoes) {
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
    <td colspan="3"></td>
    <td>${listaNegociacoes.volumeTotal}</td>
    </tfoot>
    </table>`;
  }

}
