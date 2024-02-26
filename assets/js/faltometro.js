function addFalta(id) {
    var qtd_faltas = localStorage.getItem(`qtd_faltas_id_${id}`);
    qtd_faltas = parseInt(qtd_faltas);
    qtd_faltas++;
    localStorage.setItem(`qtd_faltas_id_${id}`, qtd_faltas);

    var disciplinas = document.getElementById("disciplinas_faltometro");
    disciplinas.innerHTML = "";
    mostrarDisciplinas();

}

function removeFalta(id) {
    var qtd_faltas = localStorage.getItem(`qtd_faltas_id_${id}`);
    if (qtd_faltas > 0) {
        qtd_faltas = parseInt(qtd_faltas);
        qtd_faltas--;
        localStorage.setItem(`qtd_faltas_id_${id}`, qtd_faltas);

        var disciplinas = document.getElementById("disciplinas_faltometro");
        disciplinas.innerHTML = "";
        mostrarDisciplinas();
    }
}

function mostrarDisciplinas() {
    var qtd = localStorage.getItem(`qtd_disciplinas`);
    if (qtd) {
        qtd = parseInt(qtd);

        for (var i = 1; i <= qtd; i++) {
            var disciplina = localStorage.getItem(`nome_disciplina_id_${i}`);
            var qtd_creditos = localStorage.getItem(`qtd_creditos_id_${i}`);
            var qtd_faltas = localStorage.getItem(`qtd_faltas_id_${i}`);

            limite_faltas = qtd_creditos * 2 - 1


            document.getElementById('disciplinas_faltometro').innerHTML += `<div class="col-sm coluna-disciplinas">
                <div class="disciplinas">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="mt-0 mb-1">${disciplina}</h5>
                            <p class="descricao-disciplinas">Qtd. créditos: ${qtd_creditos}</p>
                            <div style="text-align:left">
                                <button style="margin: 5px 0px; color:#fff;" class="btn-3" onclick="addFalta(${i})"><i class="fa fa-plus"></i> falta</button>
                                <button style="margin: 5px; color:#fff;" class="btn-3" onclick="removeFalta(${i})"><i class="fa fa-minus"></i> falta</button>
                            </div>
                            <hr style="background: var(--color-txt);opacity: 0.25;">
                            <p style="text-align: left">ℹ️ Suas faltas: ${qtd_faltas}</br>
                                ⚠️ Limite recomendado: ${limite_faltas}</p>
                            
                        </div>
                        <div><button style="background: transparent" class="btn-3"  href="" onclick="excluirDisciplina(${i})"><i class="fa fa-close"></i></button></div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" id="progress_bar_${i}"></div>
                    </div>
                </div>
            </div>`;

            var progresso = (qtd_faltas / limite_faltas) * 100;
            var progresso = progresso.toFixed(2);
            if (progresso > 100) {
                document.getElementById(`progress_bar_${i}`).style.width = 100 + "%";
                document.getElementById(`progress_bar_${i}`).style.background = "#FF0000";
            } else {
                document.getElementById(`progress_bar_${i}`).style.width = progresso + "%";
            }
        }
    }
}

function addDisciplinaFaltometro() {
    var qtd_creditos = document.getElementById("qtd_creditos").value;
    var nome_disciplina = document.getElementById("nome_disciplina").value;

    if (qtd_creditos && nome_disciplina) {
        console.log(nome_disciplina, qtd_creditos);

        var qtd = localStorage.getItem(`qtd_disciplinas`);
        console.log(qtd);

        // Se já há disciplinas no armazenamento local seguir armazenando de acordo com a contagem, se não, inicia-se em 1
        if (qtd) {
            qtd = parseInt(qtd);

            localStorage.setItem(`nome_disciplina_id_${qtd+1}`, nome_disciplina);
            localStorage.setItem(`qtd_creditos_id_${qtd+1}`, qtd_creditos);
            localStorage.setItem(`qtd_faltas_id_${qtd+1}`, 0);

            localStorage.setItem(`qtd_disciplinas`, (qtd + 1).toString());
        } else {
            localStorage.setItem(`nome_disciplina_id_1`, nome_disciplina);
            localStorage.setItem(`qtd_creditos_id_1`, qtd_creditos);
            localStorage.setItem(`qtd_faltas_id_1`, 0);

            localStorage.setItem(`qtd_disciplinas`, "1");
        }

        var disciplinas = document.getElementById("disciplinas_faltometro");
        disciplinas.innerHTML = "";
        mostrarDisciplinas();
    } else {
        var tituloDisciplina = document.getElementById("modalTitulo");
        tituloDisciplina.innerHTML = `Adicione o nome e a quantidade de créditos da disciplina.`;

        var excluirFooter = document.getElementById("modalFooter");
        excluirFooter.innerHTML = `<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`

        var modalFaltometro = new bootstrap.Modal(document.getElementById('modalFaltometro'));
        modalFaltometro.show();
    }
}

function excluirID(id) {
    var qtd = localStorage.getItem(`qtd_disciplinas`);
    if (qtd) {
        qtd = parseInt(qtd);
        // Reorganizando os dados para a exclusão do último id
        if (qtd == id) {
            localStorage.removeItem(`nome_disciplina_id_${id}`);
            localStorage.removeItem(`qtd_creditos_id_${id}`);
            localStorage.removeItem(`qtd_faltas_id_${id}`);

            qtd = qtd - 1;
            localStorage.setItem(`qtd_disciplinas`, qtd);
        } else {
            for (var i = id; i < qtd; i++) {
                var disciplina = localStorage.getItem(`nome_disciplina_id_${i+1}`);
                var qtd_creditos = localStorage.getItem(`qtd_creditos_id_${i+1}`);
                var qtd_faltas = localStorage.getItem(`qtd_faltas_id_${i+1}`);

                localStorage.setItem(`nome_disciplina_id_${i}`, disciplina);
                localStorage.setItem(`qtd_creditos_id_${i}`, qtd_creditos);
                localStorage.setItem(`qtd_faltas_id_${i}`, qtd_faltas);
            }

            localStorage.removeItem(`nome_disciplina_id_${qtd}`);
            localStorage.removeItem(`qtd_creditos_id_${qtd}`);
            localStorage.removeItem(`qtd_faltas_id_${qtd}`);

            qtd = qtd - 1;
            localStorage.setItem(`qtd_disciplinas`, qtd);
        }
    }

    location.reload();

}

// abre modal de confirmação  OK
function excluirDisciplina(id) {
    var disciplina = localStorage.getItem(`nome_disciplina_id_${id}`);

    var tituloDisciplina = document.getElementById("modalTitulo");
    tituloDisciplina.innerHTML = `Deseja excluir a disciplina "${disciplina}"?`;

    var excluirFooter = document.getElementById("modalFooter");
    excluirFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
    <button type="button" class="btn btn-primary" onclick="excluirID(${id})">Excluir</button>`

    var modalFaltometro = new bootstrap.Modal(document.getElementById('modalFaltometro'));
    modalFaltometro.show();
}

mostrarDisciplinas();