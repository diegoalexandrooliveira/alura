System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao() {
        return function (target, propertyKey, descriptor) {
            let metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                console.log('-----------------');
                console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
                let t1 = performance.now();
                let retorno = metodoOriginal.apply(this, args);
                let t2 = performance.now();
                console.log(`Retorno do metodo ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log(`O metodo ${propertyKey} demorou ${t2 - t1} ms`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=logarTempoDeExecucao.js.map