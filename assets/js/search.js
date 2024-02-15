document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var valorRecebido = urlParams.get('por');
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('#search-button');
    const resultadosBusca = document.querySelector('#search-results');
    const modalBody = document.querySelector('.modal-body');

    /* INSERIR NOVA DISCIPLINA ABAIXO */
    const data = [{
            name: 'Cálculo 1 - Bernardini',
            url: 'c1-bernardini',
            tags: ['cálculo', 'bernardini', 'c1']
        },
        {
            name: 'Matemática Discreta 2 - Bernardini',
            url: 'md2-bernardini',
            tags: ['matemática discreta', 'bernardini', 'md2']
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
            name: 'Estrutura de dados e algoritmos 1 - Nilton',
            url: 'eda1-nilton',
            tags: ['eda1', 'estrutura de dados', 'algoritmos', 'nilton']
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
        },
        {
            name: 'Fundamentos de Arquitetura de Computadores',
            url: 'fac-john',
            tags: ['fac', 'john', 'arquitetura', 'fundamentos', 'computadores']
        }
    ];
    /* INSERIR NOVA DISCIPLINA ACIMA */


    function pesquisar(termoBusca) {
        resultadosBusca.innerHTML = '';
        modalBody.innerHTML = '';
        let haResultados = false;

        if (termoBusca.length >= 2) {
            data.forEach(function(item) {
                if (item.tags.some(tag => tag.toLowerCase().includes(termoBusca.toLowerCase()))) {
                    const result = document.createElement('p');
                    result.innerHTML = '<i class="fa-solid fa-angles-right"></i> ' + item.name;
                    result.classList.add('resultados-pesquisa');
                    result.addEventListener('click', function() {
                        enviaDisciplina(item.url);
                    });
                    resultadosBusca.appendChild(result);
                    haResultados = true;
                }
            });
        } else {
            const minCharsMessage = document.createElement('p');
            minCharsMessage.textContent = 'Por favor, digite pelo menos 2 caracteres para fazer uma busca.';
            modalBody.appendChild(minCharsMessage);
        }

        if (!haResultados && termoBusca.length >= 2) {
            const noResults = document.createElement('p');
            noResults.textContent = 'Nenhum resultado encontrado.';
            modalBody.appendChild(noResults);
        }

        $('#resultadosModal').modal('show');
    }

    // Verifique se valorRecebido não é nulo ou vazio antes de fazer a pesquisa
    if (valorRecebido && valorRecebido.trim() !== '') {
        searchInput.value = valorRecebido;
        pesquisar(valorRecebido);
    }

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const termoBusca = searchInput.value;
        pesquisar(termoBusca);
    });

    function enviaDisciplina(url) {
        var valor = url;
        var urlDestino = "media.html?em=" + encodeURIComponent(valor);
        window.location.href = urlDestino;
    }
});