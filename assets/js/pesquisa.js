const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const searchResults = document.querySelector('#search-results');

const data = [{
        name: 'C1 - Cálculo 1 - Bernardini',
        url: 'c1-bernardini'
    },
    {
        name: 'Engecon - Eng. Econômica - Glauceny',
        url: 'engecon-glauceny'
    },
    {
        name: 'C2 - Cálculo 2 - Yoko',
        url: 'c2-yoko'
    },
    {
        name: 'IAL - Yoko',
        url: 'ial-yoko'
    },
    {
        name: 'MD1 - Matemática Discreta 1 - Glauco',
        url: 'md1-glauco'
    },
    {
        name: 'EDA1 - Estrutura de dados e algoritmos 1 - Rose',
        url: 'eda1-rose'
    },
    {
        name: 'MD1 - Matemática Discreta 1 - Edson',
        url: 'md1-edson'
    },
    {
        name: 'TED1 - Teoria de eletrônica digital 1 - Renato',
        url: 'ted1-renato'
    },
    {
        name: 'PED1 - Pratica de eletrônica digital 1 - Anderson',
        url: 'ped1-anderson'
    }

];

searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchResults.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.length >= 2) {
        data.forEach(function(item) {
            if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
                document.getElementById("search-results").innerHTML += `<p class="resultados-pesquisa" onclick="enviaDisciplina('${item.url}')">${item.name}</p>`;
            }
        });
    } else {
        const result = document.createElement('p');
        result.textContent = 'Por favor, digite pelo menos 2 caracteres para fazer uma busca.';
        searchResults.appendChild(result);
    }

    $('#resultadosModal').modal('show');
});


function enviaDisciplina(url) {
    var valor = url;
    var urlDestino = "media.php?em=" + encodeURIComponent(valor);
    window.location.href = urlDestino;
}