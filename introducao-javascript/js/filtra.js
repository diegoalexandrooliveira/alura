var filtro = document.querySelector("#filtrar-tabela");
filtro.addEventListener("input", function() {

  var pacientes = document.querySelectorAll(".paciente");
  pacientes.forEach(function(paciente) {
    var nome = paciente.querySelector(".info-nome").textContent;
    console.log(nome);
  });

});
