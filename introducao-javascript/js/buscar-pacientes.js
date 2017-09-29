var botaoBuscarPacientes = document.querySelector("#buscar-paciente");
botaoBuscarPacientes.addEventListener("click", function() {

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

  xhr.addEventListener("load", function() {
    var erroAjax = document.querySelector("#erro-ajax");
    if (xhr.status == 200) {
      var dados = xhr.responseText;
      var pacientes = JSON.parse(dados);
      pacientes.forEach(function(paciente) {
        adicionaPacienteNaTabela(paciente);
      });
      erroAjax.classList.add("invisivel");
    } else {
      erroAjax.classList.remove("invisivel");
    }
  });

  xhr.send();

});
