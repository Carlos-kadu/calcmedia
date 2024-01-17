// Carrega o arquivo JSON de disciplinas
fetch('assets/json/disciplinas.json')
    .then(response => response.json())
    .then(data => {
        // Pega da url a variável que define a disciplina 
        var urlParams = new URLSearchParams(window.location.search);
        var valorRecebido = urlParams.get('em');
        // window.alert(valorRecebido);
        var disciplina = data[valorRecebido];

        if (disciplina) {
            // Restante do seu código para atualizar a página com as informações da disciplina
            document.getElementById("disciplina-title").innerText = disciplina.nome + " :: Calculadora de Médias";
            document.getElementById("disciplina-name").innerText = disciplina.nome;
            document.getElementById("atualizacao").innerText += " " + disciplina.ultimaAtualizacao;
            document.getElementById("mediaAprovacao").innerText += " " + disciplina.mediaAprovacao;

            // Insere a quantidade de campos necessários para notas
            var campos = document.getElementById("div-campos")
            for (var i = 1; i <= disciplina.qtdCampos; i++) {
                campos.innerHTML += `<p class="txt-white" id="nota${i}_p">Nota ${disciplina.nomeCampos[i-1]}: <input type="number" id="nota${i}"></p>`;
            }

            // Se houver, recupera as notas do armazenamento local
            var notas = [];
            var notasExistem = false;
            for (var i = 1; i <= disciplina.qtdCampos; i++) {
                var nota = localStorage.getItem(`nota${i}_${disciplina.id}`);
                notas.push(nota ? Number(nota) : null);
                if (nota !== null) {
                    notasExistem = true;
                }
            }

            if (notasExistem) {
                for (var i = 1; i <= disciplina.qtdCampos; i++) {
                    var notaElemento = document.getElementById(`nota${i}_p`);
                    notaElemento.innerHTML = `Nota ${disciplina.nomeCampos[i-1]}: <input type="number" value="${notas[i-1]}" id="nota${i}"> &#x1F4BE`;
                }
            }

            console.log(disciplina)
            document.getElementById('calcularMediaButton').addEventListener('click', function() {
                calcularMedia(disciplina);
            });

        } else {
            window.location.href = "index.html";
        }
    })
    .catch(error => console.error('Erro ao carregar disciplinas:', error));

function calcularMedia(disciplina) {
    console.log(disciplina)
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