document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var valorRecebido = urlParams.get('por');
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('#search-button');
    const resultadosBusca = document.querySelector('#search-results');
    const modalBody = document.querySelector('.painel-search');

    fetch('assets/json/disciplinas.json')
        .then(response => response.json())
        .then(data => {
            //console.log(data)

            function pesquisar(termoBusca) {
                resultadosBusca.innerHTML = '';
                modalBody.innerHTML = '';
                let haResultados = false;

                if (termoBusca.length >= 2) {
                    Object.keys(data).forEach(function(key) {
                        let item = data[key];
                        // if (item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                        //     item.tags.some(tag => tag.toLowerCase().includes(termoBusca.toLowerCase()))) {
                        if (item.tags.some(tag => tag.toLowerCase().includes(termoBusca.toLowerCase()))) {
                            const result = document.createElement('a');
                            result.innerHTML = '🔗 ' + item.nome;
                            result.classList.add('resultados-pesquisa');
                            result.href = 'media.html?em=' + item.url;
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

            if (valorRecebido && valorRecebido.trim() !== '') {
                const interval = setInterval(() => {
                    const searchInput = document.querySelector('#search-input');
                    if (searchInput) {
                        clearInterval(interval);
                        searchInput.value = valorRecebido;
                        pesquisar(valorRecebido);
                    }
                }, 100);
            } else {
                const minCharsMessage = document.createElement('p');
                minCharsMessage.textContent = 'Por favor, digite pelo menos 2 caracteres para fazer uma busca.';
                minCharsMessage.classList.add('txt-body');
                modalBody.appendChild(minCharsMessage);
            }
        })
        .catch(error => console.error('Erro ao carregar disciplinas:', error));

    function enviaDisciplina(url) {
        var valor = url;
        var urlDestino = "media.html?em=" + encodeURIComponent(valor);
        window.location.href = urlDestino;
    }
});