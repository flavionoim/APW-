//http://viacep.com.br/ws/${cep}/json/

function preencheCampos(campos) {
  document.getElementById("cep").value = campos.cep;
  document.getElementById("logradouro").value = campos.logradouro;
  document.getElementById("complemento").value = campos.complemento;
  document.getElementById("bairro").value = campos.bairro;
  document.getElementById("localidade").value = campos.localidade;
  document.getElementById("uf").value = campos.uf;
}

async function achaCEP() {
  let cep = document.getElementById("cep").value;

  console.log(cep);

  const url = `http://viacep.com.br/ws/${cep}/json/`;

  //const object = { cep, nome, email, telefone };

  const myInitGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const dados = await fetch(url, myInitGet);
  const elens = await dados.json();
  preencheCampos(elens);
}
