// document.addEventListener('DOMContentLoaded', function() {
//     var loader = document.getElementById('loader');
//     loader.style.display = 'none';
// });

const includeHTML = (path, targetElementId) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    document.getElementById(targetElementId).innerHTML = xhr.responseText;
                    resolve();
                } else {
                    reject(new Error(`Failed to include ${path}. Status: ${xhr.status}`));
                }
            }
        };

        xhr.open('GET', path, true);
        xhr.send();
    });
};
includeHTML('menu.html', 'menu')
    .then(() => {
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
                const searchTerm = searchInput.value.toLowerCase();
                let hasResults = false;

                if (searchTerm.length >= 2) {
                    data.forEach(function(item) {
                        if (item.tags.some(tag => tag.includes(searchTerm))) {
                            const result = document.createElement('p');
                            result.textContent = item.name;
                            result.classList.add('resultados-pesquisa');
                            result.addEventListener('click', function() {
                                enviaDisciplina(item.url);
                            });
                            searchResults.appendChild(result);
                            hasResults = true;
                        }
                    });
                } else {
                    const minCharsMessage = document.createElement('p');
                    minCharsMessage.textContent = 'Por favor, digite pelo menos 2 caracteres para fazer uma busca.';
                    modalBody.appendChild(minCharsMessage);
                }

                if (!hasResults && searchTerm.length >= 2) {
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
    })
    .catch((error) => {
        console.error(error);
    });
includeHTML('footer.html', 'footer');