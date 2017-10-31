"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
fs_1.writeFile('teste.txt', 'Gravei no arquivo', err => {
    if (err) {
        return console.log('Não foi possível criar o arquivo');
    }
    console.log('arquivo criado com sucesso');
});
