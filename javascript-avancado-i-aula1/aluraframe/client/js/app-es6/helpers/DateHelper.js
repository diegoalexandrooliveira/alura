class DateHelper {

  constructor() {
    throw new Error("DateHelper não pode ser instânciado");
  }

  static textoParaData(texto) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error("Deve estar no formato aaaa-mm-dd");
      return new Date(...texto.split('-')
        .map((itemArray, index) => index != 1 ? Number(itemArray) : Number(itemArray) - 1));
    }

    static dataParaTexto(data) {
      return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

  }
