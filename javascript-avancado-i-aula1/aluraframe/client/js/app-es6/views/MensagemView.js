import {View} from './View'
export class MensagemView extends View {

  template(mensagem) {

    return mensagem.texto ? `<p class="alert alert-info">${mensagem.texto}</p>` : `<p></p>`;

  }
}
