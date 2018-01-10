"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validarDescricao(descricao) {
    return descricao.value == 1
        ? null
        : {
            validarDescricao: {
                valid: false
            }
        };
}
exports.validarDescricao = validarDescricao;
//# sourceMappingURL=cadastro.validator.js.map