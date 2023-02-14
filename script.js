(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})();

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_jogos')) ?? [];
}

function setLocalStorage(bd_jogos) {
  localStorage.setItem('bd_jogos', JSON.stringify(bd_jogos));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() {
  limparTabela();
  const bd_jogos = getLocalStorage();
  let index = 0;
  for (jogo of bd_jogos) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${jogo.nome}</td>
        <td>${jogo.desenvolvedora}</td>
        <td>${jogo.plataforma}</td>
        <td>${jogo.ano_lancamento}</td>
        <td>${jogo.genero}</td>
        <td>${jogo.serie}</td>
        
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `;
    document.querySelector("#tabela>tbody").appendChild(novaLinha);
    index++;
  }
}

function inserir() {
  const jogo = {
    nome: document.getElementById('nome').value,
    desenvolvedora: document.getElementById('desenvolvedora').value,
    serie: document.getElementById('serie').value,
    plataforma: document.getElementById('plataforma').value,
    ano_lancamento: document.getElementById('ano_lancamento').value,
    genero: document.getElementById('genero').value,
  }
  const bd_jogos = getLocalStorage();
  bd_jogos.push(jogo);
  setLocalStorage(bd_jogos);
  atualizarTabela();// adiciona esta linha para atualizar a tabela após cadastrar
  validarSerie();
}

function excluir(index) {
  const bd_jogos = getLocalStorage();
  bd_jogos.splice(index, 1);
  setLocalStorage(bd_jogos);
  atualizarTabela();
}
function validarSerie() {
  const bd_jogos = getLocalStorage();
  for (jogo of bd_jogos) {
    if (serie.value === jogo.serie) {
      serie.setCustomValidity("Este número de série já existe!");
      feedbackSerie.innerText = "Este número de série já existe!";
      console.log("Série inválida: ", serie.value);
      return false;
    } else {
      serie.setCustomValidity("");
      feedbackSerie.innerText = "Informe o número de série corretamente.";
      console.log("Série válida: ", serie.value);
    }
  }
  console.log("Todas as séries válidas");
  return true;
}
atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada
const serie = document.getElementById("serie");
const feedbackSerie = document.getElementById("feedbackSerie");
serie.addEventListener('input', validarSerie);


