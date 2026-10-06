<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Controle Financeiro</title>

    <meta
        name="description"
        content="Sistema de controle financeiro pessoal"
    >
</head>

<body>

    <!-- Cabeçalho principal -->
    <header>
        <div>
            <h1>Controle Financeiro</h1>
            <p>Organize suas receitas, despesas e seu saldo.</p>
        </div>

        <!-- Navegação principal -->
        <nav aria-label="Navegação principal">
            <ul>
                <li>
                    <a href="#dashboard">Dashboard</a>
                </li>

                <li>
                    <a href="#transacoes">Transações</a>
                </li>

                <li>
                    <a href="#relatorios">Relatórios</a>
                </li>
            </ul>
        </nav>
    </header>


    <!-- Conteúdo principal -->
    <main>

        <!-- =========================
             DASHBOARD
        ========================== -->
        <section id="dashboard" aria-labelledby="titulo-dashboard">

            <header>
                <h2 id="titulo-dashboard">Dashboard</h2>
                <p>Resumo da sua situação financeira.</p>
            </header>


            <!-- Saldo -->
            <article class="card-financeiro">

                <h3>Saldo atual</h3>

                <p
                    id="saldo-atual"
                    data-campo="saldo"
                    data-valor="0"
                >
                    R$ 0,00
                </p>

            </article>


            <!-- Receitas -->
            <article class="card-financeiro">

                <h3>Total de receitas</h3>

                <p
                    id="total-receitas"
                    data-campo="receitas"
                    data-valor="0"
                >
                    R$ 0,00
                </p>

            </article>


            <!-- Despesas -->
            <article class="card-financeiro">

                <h3>Total de despesas</h3>

                <p
                    id="total-despesas"
                    data-campo="despesas"
                    data-valor="0"
                >
                    R$ 0,00
                </p>

            </article>


            <!-- Economia -->
            <article class="card-financeiro">

                <h3>Economia</h3>

                <p
                    id="total-economia"
                    data-campo="economia"
                    data-valor="0"
                >
                    R$ 0,00
                </p>

            </article>

        </section>


        <!-- =========================
             NOVA TRANSAÇÃO
        ========================== -->
        <section id="transacoes" aria-labelledby="titulo-transacoes">

            <header>
                <h2 id="titulo-transacoes">
                    Nova transação
                </h2>
            </header>


            <form id="form-transacao">

                <!-- Descrição -->
                <div>
                    <label for="descricao">
                        Descrição
                    </label>

                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        placeholder="Ex: Salário"
                        required
                    >
                </div>


                <!-- Valor -->
                <div>
                    <label for="valor">
                        Valor
                    </label>

                    <input
                        type="number"
                        id="valor"
                        name="valor"
                        min="0"
                        step="0.01"
                        placeholder="0,00"
                        required
                    >
                </div>


                <!-- Tipo -->
                <div>
                    <label for="tipo">
                        Tipo
                    </label>

                    <select
                        id="tipo"
                        name="tipo"
                        required
                    >
                        <option value="">
                            Selecione
                        </option>

                        <option value="receita">
                            Receita
                        </option>

                        <option value="despesa">
                            Despesa
                        </option>
                    </select>
                </div>


                <!-- Categoria -->
                <div>
                    <label for="categoria">
                        Categoria
                    </label>

                    <select
                        id="categoria"
                        name="categoria"
                        required
                    >
                        <option value="">
                            Selecione
                        </option>

                        <option value="salario">
                            Salário
                        </option>

                        <option value="alimentacao">
                            Alimentação
                        </option>

                        <option value="moradia">
                            Moradia
                        </option>

                        <option value="transporte">
                            Transporte
                        </option>

                        <option value="saude">
                            Saúde
                        </option>

                        <option value="educacao">
                            Educação
                        </option>

                        <option value="lazer">
                            Lazer
                        </option>

                        <option value="compras">
                            Compras
                        </option>

                        <option value="investimentos">
                            Investimentos
                        </option>

                        <option value="outros">
                            Outros
                        </option>
                    </select>
                </div>


                <!-- Data -->
                <div>
                    <label for="data">
                        Data
                    </label>

                    <input
                        type="date"
                        id="data"
                        name="data"
                        required
                    >
                </div>


                <!-- Observação -->
                <div>
                    <label for="observacao">
                        Observação
                    </label>

                    <textarea
                        id="observacao"
                        name="observacao"
                        rows="4"
                        placeholder="Digite uma observação..."
                    ></textarea>
                </div>


                <button type="submit">
                    Adicionar transação
                </button>

            </form>

        </section>


        <!-- =========================
             LISTA DE TRANSAÇÕES
        ========================== -->
        <section
            id="lista-transacoes"
            aria-labelledby="titulo-lista"
        >

            <header>
                <h2 id="titulo-lista">
                    Transações
                </h2>
            </header>


            <div>
                <label for="filtro-tipo">
                    Filtrar por tipo
                </label>

                <select id="filtro-tipo">
                    <option value="todos">
                        Todos
                    </option>

                    <option value="receita">
                        Receitas
                    </option>

                    <option value="despesa">
                        Despesas
                    </option>
                </select>
            </div>


            <table>

                <caption>
                    Lista de transações financeiras
                </caption>

                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>


                <!--
                    Este tbody será preenchido
                    posteriormente pelos dados.
                -->
                <tbody id="tabela-transacoes">

                    <tr data-id="exemplo">

                        <td data-campo="descricao">
                            Nenhuma transação
                        </td>

                        <td data-campo="categoria">
                            -
                        </td>

                        <td data-campo="tipo">
                            -
                        </td>

                        <td data-campo="data">
                            -
                        </td>

                        <td data-campo="valor">
                            R$ 0,00
                        </td>

                        <td>
                            <button
                                type="button"
                                data-acao="editar"
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                data-acao="excluir"
                            >
                                Excluir
                            </button>
                        </td>

                    </tr>

                </tbody>

            </table>

        </section>


        <!-- =========================
             RELATÓRIOS
        ========================== -->
        <section id="relatorios" aria-labelledby="titulo-relatorios">

            <header>
                <h2 id="titulo-relatorios">
                    Relatórios
                </h2>
            </header>


            <article>

                <h3>Resumo financeiro</h3>

                <dl>

                    <dt>Receitas</dt>

                    <dd
                        id="relatorio-receitas"
                        data-campo="receitas"
                    >
                        R$ 0,00
                    </dd>


                    <dt>Despesas</dt>

                    <dd
                        id="relatorio-despesas"
                        data-campo="despesas"
                    >
                        R$ 0,00
                    </dd>


                    <dt>Saldo</dt>

                    <dd
                        id="relatorio-saldo"
                        data-campo="saldo"
                    >
                        R$ 0,00
                    </dd>

                </dl>

            </article>

        </section>

    </main>


    <!-- Rodapé -->
    <footer>

        <p>
            &copy; 2026 Controle Financeiro
        </p>

    </footer>

</body>

</html
