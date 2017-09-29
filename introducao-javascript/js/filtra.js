var filtro = document.querySelector("#filtrar-tabela");
filtro.addEventListener("input", function() {

  var pacientes = document.querySelectorAll(".paciente");
  pacientes.forEach(function(paciente) {
    var nome = paciente.querySelector(".info-nome").textContent;
    var expressao = new RegExp(filtro.value, "i");
    if (!expressao.test(nome) && filtro.value.length != 0) {
      paciente.classList.add("invisivel");
    } else {
      paciente.classList.remove("invisivel");
    }
  });

});
