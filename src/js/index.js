let dados; // Variável global para armazenar os dados obtidos da API

(() => {
  // Função auto-invocável para encapsular a lógica de fetch

  // Configuração da requisição para buscar os dados em formato JSON
  const url = "/src/data/dados.json";
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  };

  // Realiza a requisição fetch para a API e trata a resposta
  fetch(url, options)
    .then((response) => {
      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        // Converte a resposta para formato JSON
        return response.json();
      } else {
        // Caso ocorra um erro, lança uma exceção com a mensagem de erro
        const errorText = response.text();
        throw new Error("Erro ao fazer buscar banco de dados: " + errorText);
      }
    })
    .then((data) => {
      // Armazena os dados obtidos na variável global 'dados'
      dados = data;
    })
    .catch((error) => onError(error));

  // Função para tratar erros ocorridos durante a requisição
  function onError(error) {
    console.debug(error);
  }
})();

// Função para realizar a pesquisa nos dados e exibir os resultados na página
function pesquisar() {
  // Obtém a seção onde os resultados serão exibidos
  const section = document.getElementById("resultados-pesquisa");
  const campoPesquisa = document.getElementById("campo-pesquisa");
  const campoPesquisaLetrasMinusculas = campoPesquisa.value.toLowerCase();

  if (campoPesquisaLetrasMinusculas == "") {
    section.innerHTML = "<p>Nada foi Encontrado! Digite pelo menos 3 caracteres para pesquisar</p>";
    return 0;
  }
  // Inicializa uma string para armazenar os resultados da pesquisa
  let resultados = "";
  let titulo = "";
  let descricao = "";
  let tags = "";
  // Itera sobre os dados e constrói o HTML para cada resultado
  for (let dado of dados) {
    titulo = dado.titulo;
    descricao = dado.descricao;
    tags = dado.tags;
    if (
      titulo.toLowerCase().includes(campoPesquisaLetrasMinusculas) ||
      descricao.toLowerCase().includes(campoPesquisaLetrasMinusculas) ||
      tags.toLowerCase().includes(campoPesquisaLetrasMinusculas)
    ) {
      resultados += `
        <div class="item-resultado">
            <h2>
                <a href="#" target="_blank">${titulo}</a>
            </h2>
            <p class="descricao-meta">${descricao}</p>
            <br>
            <p class="descricao-meta">Tags:${tags}</p>
            <a
                href="${dado.link}"
                target="_blank">
                Mais Informações
            </a>
        </div>`;
    }
}

  if (!resultados) {
    section.innerHTML = "<p>Nada foi Encontrado!</p>";
  }

// Atualiza o conteúdo da seção com os resultados da pesquisa
section.innerHTML = resultados;
}
