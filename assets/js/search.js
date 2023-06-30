document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('#search-button');
    const searchResults = document.querySelector('#search-results');
    const modalBody = document.querySelector('.modal-body');

    const data = [{
            name: 'Cálculo 1 - Bernardini',
            url: 'c1-bernardini',
            tags: ['cálculo', 'bernardini', 'c1']
        },
        {
            name: 'Eng. Econômica - Glauceny',
            url: 'engecon-glauceny',
            tags: ['engecon', 'engenharia econômica', 'glauceny', 'econômica', 'engenharia', 'ee']
        },
        {
            name: 'Cálculo 2 - Yoko',
            url: 'c2-yoko',
            tags: ['cálculo', 'yoko', 'c2']
        },
        {
            name: 'IAL - Yoko',
            url: 'ial-yoko',
            tags: ['ial', 'yoko']
        },
        {
            name: 'Matemática Discreta 1 - Glauco',
            url: 'md1-glauco',
            tags: ['md1', 'matemática discreta', 'glauco']
        },
        {
            name: 'Estrutura de dados e algoritmos 1 - Rose',
            url: 'eda1-rose',
            tags: ['eda1', 'estrutura de dados', 'algoritmos', 'rose']
        },
        {
            name: 'Matemática Discreta 1 - Edson',
            url: 'md1-edson',
            tags: ['md1', 'matemática discreta', 'edson']
        },
        {
            name: 'Teoria de eletrônica digital 1 - Renato',
            url: 'ted1-renato',
            tags: ['ted1', 'teoria de eletrônica', 'digital', 'renato', 'eletrônica']
        },
        {
            name: 'Prática de eletrônica digital 1 - Anderson',
            url: 'ped1-anderson',
            tags: ['ped1', 'prática de eletrônica', 'digital', 'anderson', 'eletrônica']
        }
    ];

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        searchResults.innerHTML = '';
        modalBody.innerHTML = '';
        const termoPesquisa = searchInput.value.toLowerCase();
        let haResultados = false;

        if (termoPesquisa.length >= 2) {
            data.forEach(function(item) {
                if (item.tags.some(tag => tag.includes(termoPesquisa))) {
                    const result = document.createElement('p');
                    result.textContent = item.name;
                    result.classList.add('resultados-pesquisa');
                    result.addEventListener('click', function() {
                        enviaDisciplina(item.url);
                    });
                    searchResults.appendChild(result);
                    haResultados = true;
                }
            });
        } else {
            const minCharsMessage = document.createElement('p');
            minCharsMessage.textContent = 'Por favor, digite pelo menos 2 caracteres para fazer uma busca.';
            modalBody.appendChild(minCharsMessage);
        }

        if (!haResultados && termoPesquisa.length >= 2) {
            const semResultados = document.createElement('p');
            semResultados.textContent = 'Nenhum resultado encontrado.';
            modalBody.appendChild(semResultados);
        }

        $('#resultadosModal').modal('show');
    });

    function enviaDisciplina(url) {
        var valor = url;
        var urlDestino = "media.php?em=" + encodeURIComponent(valor);
        window.location.href = urlDestino;
    }
});