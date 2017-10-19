import {
  View
} from './View';
import {
  DateHelper
} from '../helpers/DateHelper';
import {
  currentInstance
} from '../controllers/NegociacaoController';
export class NegociacoesView extends View {

  constructor(elemento) {

    super(elemento);
    elemento.addEventListener('click', event => {
      if (event.target.nodeName == 'TH')
        currentInstance().ordena(event.target.textContent.toLowerCase());
    });
    document.querySelector('#negociacaoView')

  }

  // <th onclick="negociacaoController.ordena('data')">DATA</th>
  // <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
  // <th onclick="negociacaoController.ordena('valor')">VALOR</th>
  // <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
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
