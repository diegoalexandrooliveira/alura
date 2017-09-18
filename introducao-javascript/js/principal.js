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
  var pesoValido = true;
  var alturaValida = true;

  if (peso <= 0 || peso >= 200) {
    pesoValido = false;
    console.log("Peso inválido!");
    tdIMC.textContent = "Peso inválido!";
    paciente.classList.add("paciente-invalido");
  }
  if (altura <= 0 || altura >= 3) {
    alturaValida = false;
    console.log("Altura inválida!");
    tdIMC.textContent = "Altura inválido!";
    paciente.classList.add("paciente-invalido");
  }

  if (alturaValida && pesoValido) {
    var imc = peso / (altura * altura);
    tdIMC.textContent = imc.toFixed(2);
  }
}

var botaoAdicionar = document.querySelector('#adicionar-paciente');
botaoAdicionar.addEventListener("click", function() {
  console.log("Clicou");
});
