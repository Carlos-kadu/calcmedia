var disciplinas = {
    "eda1-rose": {
        "id": 1,
        "nome": "EDA1 - Rose",
        "qtdCampos": 3,
        "nomeCampos": ["P1", "P2", "P3"],
        "pesos": [1, 2, 3],
        "mediaAprovacao": 50,
        "dividePor": 6,
        "ultimaAtualizacao": "2023.1"

    },
    "c2-yoko": {
        "id": 2,
        "nome": "C2 - Yoko",
        "qtdCampos": 4,
        "nomeCampos": ["P1", "P2", "P3", "NE"],
        "pesos": [0.7, 0.7, 0.7, 0.3 * 3],
        "mediaAprovacao": 5,
        "dividePor": 3,
        "ultimaAtualizacao": "2023.1"
    },
    "engecon-glauceny": {
        "id": 3,
        "nome": "Engenharia Econômica - Glauceny",
        "qtdCampos": 3,
        "nomeCampos": ["P1", "P2", "P3"],
        "pesos": [3, 3, 4],
        "mediaAprovacao": 5,
        "dividePor": 10,
        "ultimaAtualizacao": "2023.1"
    },
    "ial-yoko": {
        "id": 4,
        "nome": "IAL - Yoko",
        "qtdCampos": 4,
        "nomeCampos": ["P1", "P2", "P3", "NE"],
        "pesos": [0.7, 0.7, 0.7, 0.3 * 3],
        "mediaAprovacao": 5,
        "dividePor": 3,
        "ultimaAtualizacao": "2022.2"
    },
    "md1-glauco": {
        "id": 5,
        "nome": "MD1 - Glauco",
        "qtdCampos": 3,
        "nomeCampos": ["P1", "P2", "P3"],
        "pesos": [1, 1, 2],
        "mediaAprovacao": 5,
        "dividePor": 4,
        "ultimaAtualizacao": "2023.1"
    },
    "md1-edson": {
        "id": 6,
        "nome": "MD1 - Edson",
        "qtdCampos": 3,
        "nomeCampos": ["P1", "P2", "P3"],
        "pesos": [1, 1, 3],
        "mediaAprovacao": 50,
        "dividePor": 5,
        "ultimaAtualizacao": "2023.1"
    },
    "ted1-renato": {
        "id": 7,
        "nome": "TED1 - Renato",
        "qtdCampos": 2,
        "nomeCampos": ["P1", "P2"],
        "pesos": [4, 6],
        "mediaAprovacao": 5,
        "dividePor": 10,
        "ultimaAtualizacao": "2023.2"
    },
    "ped1-anderson": {
        "id": 8,
        "nome": "PED1 - Anderson",
        "qtdCampos": 10,
        "nomeCampos": ["E1", "E2", "E3", "E4", "P1", "E5", "E6", "E7", "E8", "P2"],
        "pesos": [1, 1, 1, 1, 6, 1, 1, 1, 1, 6],
        "mediaAprovacao": 50,
        "dividePor": 20,
        "ultimaAtualizacao": "2023.1"
    },
    "c1-bernardini": {
        "id": 9,
        "nome": "C1 - Bernardini",
        "qtdCampos": 3,
        "nomeCampos": ["P1", "P2", "P3"],
        "pesos": [3, 3, 4],
        "mediaAprovacao": 5,
        "dividePor": 10,
        "ultimaAtualizacao": "2022.2"
    },
    "md2-bernardini": {
        "id": 10,
        "nome": "MD2 - Bernardini",
        "qtdCampos": 3,
        "nomeCampos": ["P1", "P2", "P3"],
        "pesos": [3, 3, 4],
        "mediaAprovacao": 5,
        "dividePor": 10,
        "ultimaAtualizacao": "2023.2"
    },
    "fac-john": {
        "id": 11,
        "nome": "FAC - John Lenon",
        "qtdCampos": 4,
        "nomeCampos": ["AS1", "AS2", "AS3", "MF"],
        "pesos": [0.85, 0.85, 0.85, 0.15 * 3],
        "mediaAprovacao": 5,
        "dividePor": 3,
        "ultimaAtualizacao": "2023.2"
    },
    "eda1-nilton": {
        "id": 12,
        "nome": "EDA1 - Nilton",
        "qtdCampos": 3,
        "nomeCampos": ["P1", "P2", "P3"],
        "pesos": [1, 2, 3],
        "mediaAprovacao": 5,
        "dividePor": 6,
        "ultimaAtualizacao": "2023.2"

    },
};

// Recebe da caixa de pesquisa ou via menu a variável que define a disciplina 
var urlParams = new URLSearchParams(window.location.search);
var valorRecebido = urlParams.get('em');
// window.alert(valorRecebido);
var disciplina = disciplinas[valorRecebido];

if (disciplina) {
    // Atualiza o título da página e o nome da disciplina
    document.getElementById("disciplina-title").innerText = disciplina.nome + " :: Calculadora de Médias";
    document.getElementById("disciplina-name").innerText = disciplina.nome;
    document.getElementById("atualizacao").innerText += " " + disciplina.ultimaAtualizacao;
    document.getElementById("mediaAprovacao").innerText += " " + disciplina.mediaAprovacao;

    // Se C2 ou IAL com Yoko -> Mostrar funcionalidade para cálculo da média das listas
    if (valorRecebido == "ial-yoko" || valorRecebido == "c2-yoko") listasYoko()

    // Insere a quantidade de campos necessários para notas
    var campos = document.getElementById("div-campos")
    for (var i = 1; i <= disciplina.qtdCampos; i++) {
        campos.innerHTML += `<p class="txt-white" id="nota${i}_p">Nota ${disciplina.nomeCampos[i-1]}: <input type="number" id="nota${i}"></p>`;
    }

    // Se houver, recupera as notas do armazenamento local
    var notas = [];
    for (var i = 1; i <= disciplina.qtdCampos; i++) {
        var nota = localStorage.getItem(`nota${i}_${disciplina.id}`);
        notas.push(nota ? Number(nota) : NULL);
    }

    // Se houver notas no armaz. local, atualiza os campos de notas com os dados recuperados
    if (notas)
        for (var i = 1; i <= disciplina.qtdCampos; i++) {
            var notaElemento = document.getElementById(`nota${i}_p`);
            notaElemento.innerHTML = `Nota ${disciplina.nomeCampos[i-1]}: <input type="number" value="${notas[i-1]}" id="nota${i}"> &#x1F4BE`;
        }
} else {
    window.location.href = "index.html";
}

function calcularMedia() {
    var notas = [];
    for (var i = 1; i <= disciplina.qtdCampos; i++) {
        var nota = document.getElementById(`nota${i}`).value;
        if (nota === "") {
            window.alert('PREENCHA TODOS OS CAMPOS ANTES DE FINALIZAR!');
            return;
        }
        notas.push(Number(nota));
        localStorage.setItem(`nota${i}_${disciplina.id}`, nota);
    }

    var pesos = disciplina.pesos;
    var resultado = 0;
    for (var i = 0; i < disciplina.qtdCampos; i++) {
        resultado += notas[i] * pesos[i];
    }
    resultado /= disciplina.dividePor;
    resultado = resultado.toFixed(2);

    var media;
    if (resultado >= disciplina.mediaAprovacao) {
        media = `A sua média é: ${resultado}, parabéns, você foi aprovado! &#x1F601`;
    } else {
        media = `A sua média é: ${resultado}, você ainda não foi aprovado! &#x1F625`;
    }
    localStorage.setItem(`${disciplina.id}_media`, media);
    document.getElementById('resultado').innerHTML = media + '<br><span class="save">Notas salvas no armazenamento local</span>';
}

// Recuperando a média do armazenamento local
var media = localStorage.getItem(`${disciplina.id}_media`);
if (media) {
    document.getElementById('resultado').innerHTML = media;
}

///////////////// FUNÇÕES EXTRAS /////////////////

/////// LISTAS DA YOKO ///////
function listasYoko() {
    document.getElementById("painel-calc-extras").style.display = "block";
    document.getElementById("calculos-extras").innerHTML = `
        <div class="painel-header">Insira as notas das listas abaixo.<label>(Separadas por ';'. Ex: 8.9;9.9;8.75):</label>
        </div> 
        <div class="painel-body"><input type="text" id="notas_listas">
            <div class="modal-footer">
                <button class="btn btn-primary" style="margin:-10px" onclick="calcularMediaListasYoko()">Calcular</button>
                
            </div>
            <p style="font-weight: bold; margin-bottom: 0px; text-align: center; color: #fff;" id="resultado_listas"></p>
        </div>
`;
}

function calcularMediaListasYoko() {
    var notasInput = document.getElementById('notas_listas');
    var notasTexto = notasInput.value;
    localStorage.setItem('notas_listas', notasTexto);

    var notas = notasTexto.split(';').map(nota => Number(nota.trim()));

    // Encontra a menor nota
    var menorNota = Math.min(...notas);

    // Encontra o índice da primeira ocorrência da menor nota
    var indiceMenorNota = notas.findIndex(nota => nota === menorNota);

    // Cria um novo array sem a primeira ocorrência da menor nota
    var notasSemMenor = notas.slice(0, indiceMenorNota).concat(notas.slice(indiceMenorNota + 1));

    // Calcula a média excluindo a menor nota
    var mediaSemMenor = notasSemMenor.reduce((a, b) => a + b, 0) / notasSemMenor.length;

    // Calcula a média incluindo a menor nota
    var mediaComMenor = notas.reduce((a, b) => a + b, 0) / notas.length;

    var resultado = document.getElementById('resultado_listas');
    resultado.innerHTML = `Média NE sem menor nota: ${mediaSemMenor.toFixed(2)} <br>Média NE com menor nota: ${mediaComMenor.toFixed(2)}`;

    // Armazena os dados no localStorage
    localStorage.setItem(`notas_listas_${disciplina.id}`, notasTexto);
    localStorage.setItem(`media_sem_menor_${disciplina.id}`, mediaSemMenor.toFixed(2));
    localStorage.setItem(`media_com_menor_${disciplina.id}`, mediaComMenor.toFixed(2));
}



window.addEventListener('DOMContentLoaded', function() {
    var notasInput = document.getElementById('notas_listas');
    var notasTexto = localStorage.getItem(`notas_listas_${disciplina.id}`);

    if (notasTexto) {
        notasInput.value = notasTexto;
    }
});

////////////////////////////////////////////////////////
