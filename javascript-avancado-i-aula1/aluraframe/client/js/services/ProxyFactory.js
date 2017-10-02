class ProxyFactory {
  static create(objeto, props, acao) {
    return new Proxy(objeto, {
      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._propFuncao(target[prop])) {
          return function() {
            let retorno = Reflect.apply(target[prop], target, arguments);
            acao(target);
            return retorno;
          }
        } else {
          return Reflect.get(target, prop, receiver);
        }
      },
      set: function(target, prop, value, receiver) {
        let retorno = Reflect.set(target, prop, value, receiver);
        if (props.includes(prop)) acao(target);
        return retorno;
      }
    });

  }

  static _propFuncao(prop) {
    return typeof(prop) == typeof(Function);
  }
}
