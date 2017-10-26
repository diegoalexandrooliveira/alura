export function logarTempoDeExecucao() {

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let metodoOriginal = descriptor.value;
    descriptor.value = function(...args: any[]) {
      console.log('-----------------');
      console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
      let t1 = performance.now();
      let retorno = metodoOriginal.apply(this, args);
      let t2 = performance.now();
      console.log(`Retorno do metodo ${propertyKey} é ${JSON.stringify(retorno)}`);
      console.log(`O metodo ${propertyKey} demorou ${t2 - t1} ms`);
      return retorno;
    }
    return descriptor;
  }

}
