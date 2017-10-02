class ProxyFactory {
  static create(objeto, props, acao) {

    return new Proxy(objeto, {
      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._propFuncao(target[prop])) {
          return function() {
            Reflect.apply(target[prop], target, arguments);
            return acao(target);
          }
        } else {
          return Reflect.get(target, prop, receiver);
        }
      },
      set(target, prop, value, receiver) {
        console.log("Chamou");
        if (props.includes(prop)) {
          target[prop] = value;
          acao(target);
          console.log("É a prop");
        }
        return Reflect.set(target, prop, value, receiver);
      }
    });

  }

  static _propFuncao(prop) {
    return typeof(prop) == typeof(Function);
  }
}
