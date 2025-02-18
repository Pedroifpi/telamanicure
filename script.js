/// Carrega os horários do armazenamento local ou cria um array vazio

let horariosSalvos = JSON.parse(localStorage.getItem("horariosManicure")) || [];

function carregarTabela() {

    let tabela = document.getElementById("horariosTabela");
    // Se a tabela não for encontrada, não faz nada

    if (!tabela) {

        console.error("Elemento 'horariosTabela' não encontrado.");

        return;

    }

    tabela.innerHTML = ""; // Limpa a tabela antes de recriar os horários

    horariosSalvos.forEach((horario, index) => {

        let linha = document.createElement("tr");

        // Coluna do Dia

        let colunaDia = document.createElement("td");

        colunaDia.innerText = horario.dia;

        // Coluna do Horário

        let colunaHorario = document.createElement("td");

        colunaHorario.innerText = horario.hora;

        // Coluna de Selecionar (Confirmar Agendamento)

        let colunaSelecionar = document.createElement("td");

        let btnConfirmar = document.createElement("button");

        btnConfirmar.innerText = "✅"; // Ícone de confirmação

        btnConfirmar.classList.add("confirmar");

        btnConfirmar.onclick = () => confirmarAgendamento(index);

        colunaSelecionar.appendChild(btnConfirmar);

        // Coluna de Rejeitar Agendamento

        let colunaRejeitar = document.createElement("td");

        let btnRejeitar = document.createElement("button");

        btnRejeitar.innerText = "❌"; // Ícone de rejeição

        btnRejeitar.classList.add("rejeitar");

        btnRejeitar.onclick = () => rejeitarAgendamento(index);

        colunaRejeitar.appendChild(btnRejeitar);

        // Coluna de Remover Horário

        let colunaRemover = document.createElement("td");

        let btnRemover = document.createElement("button");

        btnRemover.innerText = "🗑️"; // Ícone de remover

        btnRemover.classList.add("remover");

        btnRemover.onclick = () => removerHorario(index);

        colunaRemover.appendChild(btnRemover);

        // Adiciona as colunas à linha

        linha.appendChild(colunaDia);

        linha.appendChild(colunaHorario);

        linha.appendChild(colunaSelecionar);

        linha.appendChild(colunaRejeitar);

        linha.appendChild(colunaRemover);

        // Adiciona a linha à tabela

        tabela.appendChild(linha);

    });

}

// Função para adicionar um novo horário

function adicionarHorario() {

    let dia = document.getElementById("diaSemana").value;

    let hora = document.getElementById("novoHorario").value.trim();

    if (hora === "") {

        alert("Digite um horário válido!");

        return;

    }

    // Adiciona o novo horário ao array

    horariosSalvos.push({ dia, hora, status: "pendente" }); // Status inicial: pendente

    salvarHorarios();

    carregarTabela();

}

// Função para remover um horário

function removerHorario(index) {

    horariosSalvos.splice(index, 1);

    salvarHorarios();

    carregarTabela();

}

// Função para confirmar um agendamento

function confirmarAgendamento(index) {

    horariosSalvos[index].status = "confirmado";

    salvarHorarios();

    carregarTabela();

    alert("Agendamento confirmado com sucesso!");

}

// Função para rejeitar um agendamento

function rejeitarAgendamento(index) {

    horariosSalvos[index].status = "rejeitado";

    salvarHorarios();

    carregarTabela();

    alert("Agendamento rejeitado.");

}

// Função para salvar os horários no localStorage

function salvarHorarios() {

    localStorage.setItem("horariosManicure", JSON.stringify(horariosSalvos));

}

// Carrega a tabela quando a página é carregada

document.addEventListener("DOMContentLoaded", () => {

    carregarTabela();

});