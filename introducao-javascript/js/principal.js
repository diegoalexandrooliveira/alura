var titulo = document.querySelector('.titulo');
titulo.textContent = 'Aparecida nutricionista';

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
  }
  if (altura <= 0 || altura >= 3) {
    alturaValida = false;
    console.log("Altura inválida!");
    tdIMC.textContent = "Altura inválido!";
  }

  if (alturaValida && pesoValido) {
    var imc = peso / (altura * altura);
    tdIMC.textContent = imc.toFixed(2);
  }
}
