document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/json/disciplinas.json')
        .then(response => response.json())
        .then(data => {
            //console.log(data)

            var disciplinasDiponiveis = document.getElementById('tabelaDisciplinas')

            function gerarHTMLDisciplina(disciplina) {
                return `
                <tr>
                    <td>${disciplina.id}</td>
                    <td>${disciplina.nome}</td>
                    <td>${disciplina.ultimaAtualizacao}</td>
                    <td>
                        <a href="media.html?em=${disciplina.url}">
                            ${disciplina.url}
                        </a>
                    </td>
                </tr>
        `;
            }
            fetch('assets/json/disciplinas.json')
                .then(response => response.json())
                .then(disciplinas => {
                    // Iterar sobre as disciplinas no JSON
                    for (var i in disciplinas) {
                        if (disciplinas.hasOwnProperty(i)) {
                            var disciplina = disciplinas[i];
                            // Chamar a função para gerar a string HTML da disciplina
                            var htmlDisciplina = gerarHTMLDisciplina(disciplina);
                            disciplinasDiponiveis.innerHTML += htmlDisciplina;
                        }
                    }
                })
                .catch(error => console.error('Erro ao carregar disciplinas.json:', error));

        })
        .catch(error => console.error('Erro ao carregar disciplinas:', error));
});