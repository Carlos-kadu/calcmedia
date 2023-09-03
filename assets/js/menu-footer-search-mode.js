document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var loader = document.getElementById('loader');
        loader.style.display = 'none';
    }, 1000);
});


const includeHTML = (path, targetElementId) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    document.getElementById(targetElementId).innerHTML = xhr.responseText;
                    resolve();
                } else {
                    reject(new Error(`Erro: ${path}. Status: ${xhr.status}`));
                }
            }
        };

        xhr.open('GET', path, true);
        xhr.send();
    });
};

//INCLUI O MENU
includeHTML('menu.html', 'menu')
    .then(() => {
        // MECANISMO DE BUSCA //
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.querySelector('#search-input');
            const searchButton = document.querySelector('#search-button');
            const resultadosBusca = document.querySelector('#search-results');
            const modalBody = document.querySelector('.modal-body');

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
                resultadosBusca.innerHTML = '';
                modalBody.innerHTML = '';
                const termoBusca = searchInput.value.toLowerCase();
                let haResultados = false;

                if (termoBusca.length >= 2) {
                    data.forEach(function(item) {
                        if (item.tags.some(tag => tag.includes(termoBusca))) {
                            const result = document.createElement('p');
                            result.textContent = item.name;
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
            });

            function enviaDisciplina(url) {
                var valor = url;
                var urlDestino = "media.html?em=" + encodeURIComponent(valor);
                window.location.href = urlDestino;
            }
        });

        // TROCANDO ENTRE MODO ESCURO E MODO CLARO //
        const colorToggleBtn = document.getElementById('color-toggle');
        let isLightMode = localStorage.getItem('isLightMode') === 'true';

        colorToggleBtn.innerText = isLightMode ? "🌒 Modo escuro" : "☀️ Modo claro";

        if (isLightMode) {
            document.body.classList.add('light-mode');
        }

        colorToggleBtn.addEventListener('click', () => {
            isLightMode = !isLightMode;
            document.body.classList.toggle('light-mode', isLightMode);

            localStorage.setItem('isLightMode', isLightMode);

            colorToggleBtn.innerText = isLightMode ? "🌒 Modo escuro" : "☀️ Modo claro";
        });
    })
    .catch((error) => {
        console.error(error);
    });

// INCLUINDO O FOOTER
includeHTML('footer.html', 'footer');