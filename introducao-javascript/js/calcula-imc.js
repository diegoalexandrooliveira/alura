var titulo = document.querySelector('.titulo');
titulo.textContent = 'Aparecida nutricionista';

titulo.addEventListener("click", mostraMensagem);

function mostraMensagem() {
  console.log("Clicou");
};

var pacientes = document.querySelectorAll(".paciente");

for (var i = 0; i < pacientes.length; i++) {
  var paciente = pacientes[i];
  var tdPeso = paciente.querySelector(".info-peso");
  var peso = tdPeso.textContent;

  var tdAltura = paciente.querySelector(".info-altura");
  var altura = tdAltura.textContent;

  var tdIMC = paciente.querySelector(".info-imc");
  var pesoValido = validaPeso(peso);
  var alturaValida = validaAltura(altura);

  if (!pesoValido) {
    console.log("Peso inválido!");
    tdIMC.textContent = "Peso inválido!";
    paciente.classList.add("paciente-invalido");
  }
  if (!alturaValida) {
    console.log("Altura inválida!");
    tdIMC.textContent = "Altura inválido!";
    paciente.classList.add("paciente-invalido");
  }

  if (alturaValida && pesoValido) {
    tdIMC.textContent = calculaImc(peso, altura);
  }
}


function calculaImc(peso, altura) {
  var imc = 0;
  imc = peso / (altura * altura);
  return imc.toFixed(2);

}

function validaPeso(peso) {
  if (peso > 0 && peso < 300) {
    return true;
  } else {
    return false;
  }
}

function validaAltura(altura) {
  if (altura > 0 && altura < 3) {
    return true;
  } else {
    return false;
  }
}
