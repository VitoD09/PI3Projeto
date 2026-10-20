const CHAVE_DADOS = "controleFinanceiroTransacoes";

function carregarTransacoes() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_DADOS)) || [];
    } catch {
        return [];
    }
}

function salvarTransacoes(transacoes) {
    localStorage.setItem(CHAVE_DADOS, JSON.stringify(transacoes));
}

function moeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarData(data) {
    if (!data) return "-";
    const partes = data.split("-");
    return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data;
}

function totais(transacoes) {
    const receitas = transacoes
        .filter(item => item.tipo === "receita")
        .reduce((soma, item) => soma + Number(item.valor), 0);
    const despesas = transacoes
        .filter(item => item.tipo === "despesa")
        .reduce((soma, item) => soma + Number(item.valor), 0);
    return { receitas, despesas, saldo: receitas - despesas };
}

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function atualizarDashboard() {
    const transacoes = carregarTransacoes();
    const valores = totais(transacoes);
    const saldo = document.getElementById("saldo-atual");
    if (!saldo) return;

    document.getElementById("saldo-atual").textContent = moeda(valores.saldo);
    document.getElementById("total-receitas").textContent = moeda(valores.receitas);
    document.getElementById("total-despesas").textContent = moeda(valores.despesas);
    document.getElementById("total-economia").textContent =
        moeda(Math.max(0, valores.receitas - valores.despesas));

    const recentes = document.getElementById("transacoes-recentes");
    if (recentes) {
        recentes.replaceChildren();
        const lista = [...transacoes].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);
        if (!lista.length) {
            const tr = document.createElement("tr");
            const td = criarCelula("Nenhuma transação cadastrada.");
            td.colSpan = 5;
            tr.append(td);
            recentes.append(tr);
        } else {
            lista.forEach(item => {
                const tr = document.createElement("tr");
                tr.append(
                    criarCelula(item.descricao),
                    criarCelula(item.categoria),
                    criarCelula(item.tipo === "receita" ? "Receita" : "Despesa"),
                    criarCelula(formatarData(item.data))
                );
                const valor = criarCelula(moeda(item.valor));
                valor.className = item.tipo === "receita" ? "valor-receita" : "valor-despesa";
                tr.append(valor);
                recentes.append(tr);
            });
        }
    }
    const mensagem = document.getElementById("mensagem-dashboard");
    if (mensagem && transacoes.length) {
        mensagem.textContent = `Você tem ${transacoes.length} transação(ões) cadastrada(s). Seu saldo atual é ${moeda(valores.saldo)}.`;
    }
}

function atualizarTabela() {
    const corpo = document.getElementById("tabela-transacoes");
    if (!corpo) return;
    const filtro = document.getElementById("filtro-tipo")?.value || "todos";
    const transacoes = carregarTransacoes()
        .filter(item => filtro === "todos" || item.tipo === filtro)
        .sort((a, b) => b.data.localeCompare(a.data));
    corpo.replaceChildren();

    if (!transacoes.length) {
        const tr = document.createElement("tr");
        const td = criarCelula("Nenhuma transação encontrada.");
        td.colSpan = 6;
        tr.append(td);
        corpo.append(tr);
        return;
    }

    transacoes.forEach(item => {
        const tr = document.createElement("tr");
        tr.append(
            criarCelula(item.descricao),
            criarCelula(item.categoria),
            criarCelula(item.tipo === "receita" ? "Receita" : "Despesa"),
            criarCelula(formatarData(item.data))
        );
        const valor = criarCelula(moeda(item.valor));
        valor.className = item.tipo === "receita" ? "valor-receita" : "valor-despesa";
        tr.append(valor);

        const tdAcoes = document.createElement("td");
        const grupo = document.createElement("div");
        grupo.className = "acoes";

        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "btn-editar";
        editar.textContent = "Editar";
        editar.addEventListener("click", () => preencherFormulario(item.id));

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", () => excluirTransacao(item.id));

        grupo.append(editar, excluir);
        tdAcoes.append(grupo);
        tr.append(tdAcoes);
        corpo.append(tr);
    });
}

function preencherFormulario(id) {
    const item = carregarTransacoes().find(transacao => transacao.id === id);
    if (!item) return;
    document.getElementById("transacao-id").value = item.id;
    document.getElementById("descricao").value = item.descricao;
    document.getElementById("valor").value = item.valor;
    document.getElementById("tipo").value = item.tipo;
    document.getElementById("categoria").value = item.categoria;
    document.getElementById("data").value = item.data;
    document.getElementById("observacao").value = item.observacao || "";
    document.getElementById("botao-salvar").textContent = "Salvar alterações";
    document.getElementById("titulo-form").scrollIntoView({ behavior: "smooth" });
}

function excluirTransacao(id) {
    if (!confirm("Deseja excluir esta transação?")) return;
    salvarTransacoes(carregarTransacoes().filter(item => item.id !== id));
    atualizarTudo();
}

function configurarFormulario() {
    const formulario = document.getElementById("form-transacao");
    if (!formulario) return;

    const campoData = document.getElementById("data");
    if (campoData && !campoData.value) {
        const hoje = new Date();
        campoData.value = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
    }

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const idExistente = document.getElementById("transacao-id").value;
        const transacoes = carregarTransacoes();
        const item = {
            id: idExistente || (window.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now())),
            descricao: document.getElementById("descricao").value.trim(),
            valor: Number(document.getElementById("valor").value),
            tipo: document.getElementById("tipo").value,
            categoria: document.getElementById("categoria").value,
            data: document.getElementById("data").value,
            observacao: document.getElementById("observacao").value.trim()
        };

        if (!item.descricao || !Number.isFinite(item.valor) || item.valor <= 0 ||
            !item.tipo || !item.categoria || !item.data) {
            alert("Preencha os campos obrigatórios com valores válidos.");
            return;
        }

        const indice = transacoes.findIndex(transacao => transacao.id === item.id);
        if (indice >= 0) transacoes[indice] = item;
        else transacoes.push(item);

        salvarTransacoes(transacoes);
        formulario.reset();
        document.getElementById("transacao-id").value = "";
        document.getElementById("botao-salvar").textContent = "Adicionar transação";
        if (campoData) {
            const hoje = new Date();
            campoData.value = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
        }
        atualizarTudo();
    });

    document.getElementById("filtro-tipo")?.addEventListener("change", atualizarTabela);
}

function atualizarRelatorios() {
    const elemento = document.getElementById("relatorio-receitas");
    if (!elemento) return;
    const transacoes = carregarTransacoes();
    const valores = totais(transacoes);
    document.getElementById("relatorio-receitas").textContent = moeda(valores.receitas);
    document.getElementById("relatorio-despesas").textContent = moeda(valores.despesas);
    document.getElementById("relatorio-saldo").textContent = moeda(valores.saldo);
    document.getElementById("relatorio-quantidade").textContent = String(transacoes.length);

    const maior = Math.max(valores.receitas, valores.despesas, 1);
    document.getElementById("barra-receitas").style.width = `${(valores.receitas / maior) * 100}%`;
    document.getElementById("barra-despesas").style.width = `${(valores.despesas / maior) * 100}%`;
    document.getElementById("barra-valor-receitas").textContent = moeda(valores.receitas);
    document.getElementById("barra-valor-despesas").textContent = moeda(valores.despesas);

    const mensagem = document.getElementById("mensagem-relatorio");
    if (transacoes.length) {
        mensagem.textContent = valores.saldo >= 0
            ? `O saldo está positivo em ${moeda(valores.saldo)}.`
            : `As despesas superam as receitas em ${moeda(Math.abs(valores.saldo))}.`;
    }
}

function atualizarTudo() {
    atualizarDashboard();
    atualizarTabela();
    atualizarRelatorios();
}

document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
    atualizarTudo();
});
          
