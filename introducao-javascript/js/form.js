var botaoAdicionar = document.querySelector('#adicionar-paciente');
botaoAdicionar.addEventListener("click", function(event) {
  event.preventDefault();

  var form = document.querySelector('#form-adiciona');
  var paciente = obtemPacienteDoFormulario(form);
  var erros = validaPaciente(paciente);
  if (erros.length > 0) {
    exibeMensagemErro(erros);
    return;
  }

  adicionaPacienteNaTabela(paciente);
  form.reset();
  document.querySelector("#mensagens-erro").innerHTML = "";
});

function adicionaPacienteNaTabela(paciente) {
  document.querySelector("#tabela-pacientes").appendChild(montaTr(paciente));

}

function obtemPacienteDoFormulario(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }
  return paciente;
}


function montaTr(paciente) {
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add('paciente');

  pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome'));
  pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
  pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
  pacienteTr.appendChild(montaTd(paciente.gordura, 'info-gordura'));
  pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

  return pacienteTr;

}

function montaTd(dado, classe) {
  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);
  return td;
}

function validaPaciente(paciente) {
  var erros = [];
  if (!validaAltura(paciente.altura)) {
    erros.push("Altura inválida!");
  }
  if (!validaPeso(paciente.peso)) {
    erros.push("Peso inválido!");
  }
  if (paciente.nome.length == 0) {
    erros.push("Nome inválido!");
  }
  if (paciente.gordura.length == 0) {
    erros.push("% de gordura inválido!");
  }
  return erros;
}

function exibeMensagemErro(erros) {
  var ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";
  erros.forEach(function(erro) {
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });
}
