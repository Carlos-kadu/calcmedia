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
            tags: ['cálculo 1', 'bernardini', 'c1']
        },
        {
            name: 'Matemática Discreta 2 - Bernardini',
            url: 'md2-bernardini',
            tags: ['matemática discreta 2', 'bernardini', 'md2']
        },
        {
            name: 'Eng. Econômica - Glauceny',
            url: 'engecon-glauceny',
            tags: ['engecon', 'engenharia econômica', 'glauceny', 'econômica', 'engenharia', 'ee']
        },
        {
            name: 'Cálculo 2 - Yoko',
            url: 'c2-yoko',
            tags: ['cálculo 2', 'yoko', 'c2']
        },
        {
            name: 'IAL - Yoko',
            url: 'ial-yoko',
            tags: ['ial', 'yoko']
        },
        {
            name: 'Matemática Discreta 1 - Glauco',
            url: 'md1-glauco',
            tags: ['md1', 'matemática discreta 1', 'glauco']
        },
        {
            name: 'Estrutura de dados e algoritmos 1 - Rose',
            url: 'eda1-rose',
            tags: ['eda1', 'estrutura de dados e algoritmos 1', 'algoritmos', 'rose']
        },
        {
            name: 'Estrutura de dados e algoritmos 1 - Nilton',
            url: 'eda1-nilton',
            tags: ['eda1', 'estrutura de dados e algoritmos 1', 'algoritmos', 'nilton']
        },
        {
            name: 'Matemática Discreta 1 - Edson',
            url: 'md1-edson',
            tags: ['md1', 'matemática discreta 1', 'edson']
        },
        {
            name: 'Teoria de eletrônica digital 1 - Renato',
            url: 'ted1-renato',
            tags: ['ted1', 'teoria de eletrônica digital 1', 'digital', 'renato', 'eletrônica']
        },
        {
            name: 'Prática de eletrônica digital 1 - Anderson',
            url: 'ped1-anderson',
            tags: ['ped1', 'prática de eletrônica digital 1', 'digital', 'anderson', 'eletrônica']
        },
        {
            name: 'Fundamentos de Arquitetura de Computadores - John',
            url: 'fac-john',
            tags: ['Fundamentos de Arquitetura de Computadores', 'fac', 'john', 'arquitetura', 'fundamentos', 'computadores']
        },
        {
            name: 'Probabilidade e Estatística aplicado à Engenharia - Marília',
            url: 'peae-marilia',
            tags: ['Probabilidade e Estatística aplicado à Engenharia', 'pe', 'peae', 'marilia', 'probabilidade']
        },
        {
            name: 'Estrutura de dados e algoritmos 2 - John',
            url: 'eda2-john',
            tags: ['eda2', 'john', 'estrutura de dados e algoritmos 2', 'algoritmos']
        },
        {
            name: 'Compiladores - Bruno Ribas',
            url: 'comp-ribas',
            tags: ['ribas', 'compiladores', 'comp', 'bruno']
        },
        {
            name: 'Sistemas de Banco de Dados 1 - Vandor Roberto',
            url: 'sbd1-vandor',
            tags: ['Sistemas de Banco de Dados 1', 'vandor', 'sbd1', 'bancos', 'dados']
        },
        {
            name: 'Fundamentos de Sistemas Operacionais - Daniel',
            url: 'fso-daniel',
            tags: ['Fundamentos de Sistemas Operacionais', 'fso', 'daniel', 'sistemas', 'fundamentos', 'operacionas']
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
            minCharsMessage.classList.add('txt-body');
            modalBody.appendChild(minCharsMessage);
        }

        if (!haResultados && termoBusca.length >= 2) {
            const noResults = document.createElement('p');
            noResults.textContent = 'Nenhum resultado encontrado.';
            noResults.classList.add('txt-body');
            modalBody.appendChild(noResults);
        }

        $('#resultadosModal').modal('show');
    }

    if (valorRecebido.trim() == '') {
        const minCharsMessage = document.createElement('p');
        minCharsMessage.textContent = 'Por favor, digite pelo menos 2 caracteres para fazer uma busca.';
        minCharsMessage.classList.add('txt-body');
        modalBody.appendChild(minCharsMessage);
    }

    // Verifique se valorRecebido não é nulo ou vazio antes de fazer a pesquisa
    if (valorRecebido && valorRecebido.trim() !== '') {
        const interval = setInterval(() => {
            const searchInput = document.querySelector('#search-input');
            if (searchInput) {
                clearInterval(interval);
                searchInput.value = valorRecebido;
                pesquisar(valorRecebido);
            }
        }, 100);
    }

    function enviaDisciplina(url) {
        var valor = url;
        var urlDestino = "media.html?em=" + encodeURIComponent(valor);
        window.location.href = urlDestino;
    }
});