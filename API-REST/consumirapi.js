//http://viacep.com.br/ws/${cep}/json/

function preencheCampos(campos) {
    document.getElementById("id").value = campos.id;
    document.getElementById("nome").value = campos.nome;
    document.getElementById("email").value = campos.email;
  }
  
  async function achaCAlunos() {
    let id = parseInt(document.getElementById("cep")).value;
  
    console.log(id);
  
    //const url = `http://localhost:3000/usuarios`;
    const urls = `http://localhost:3000/usuarios/${id}`;
  
    //const object = { cep, nome, email, telefone };
  
    const myInitGet = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const dados = await fetch(urls, myInitGet);
    const elens = await dados.json();
    console.log("conteúdo de elens: ", elens)
    preencheCampos(elens[0]);
  }
  