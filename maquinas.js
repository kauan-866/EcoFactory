// =====================================================
// ECOFACTORY - MÁQUINAS
// =====================================================


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const API_URL = "http://127.0.0.1:3000";


// =====================================================
// VERIFICAR LOGIN
// =====================================================

if (
    localStorage.getItem("ecoFactoryLogado") !== "true"
) {
    window.location.href = "index.html";
}


// =====================================================
// ELEMENTOS DO HTML
// =====================================================

const tabelaMaquinas =
    document.getElementById("tabelaMaquinas");

const contador =
    document.getElementById("contador");

const modal =
    document.getElementById("modalMaquina");

const novaMaquina =
    document.getElementById("novaMaquina");

const fecharModal =
    document.getElementById("fecharModal");

const cancelarModal =
    document.getElementById("cancelarModal");

const form =
    document.getElementById("formMaquina");

const busca =
    document.getElementById("buscarMaquina");

const filtroStatus =
    document.getElementById("filtroStatus");

const filtroTipo =
    document.getElementById("filtroTipo");

const limparFiltros =
    document.getElementById("limparFiltros");

const tituloModal =
    document.getElementById("tituloModal");


// =====================================================
// CAMPOS DO FORMULÁRIO
// =====================================================

const campoNome =
    document.getElementById("nomeMaquina");

const campoTipo =
    document.getElementById("tipoMaquina");

const campoLocalizacao =
    document.getElementById("localizacaoMaquina");

const campoStatus =
    document.getElementById("statusMaquina");


// =====================================================
// PAGINAÇÃO
// =====================================================

const botaoAnterior =
    document.getElementById("anterior");

const botaoProximo =
    document.getElementById("proximo");

const paginas =
    document.getElementById("paginas");

let paginaAtual = 1;

const itensPorPagina = 8;


// =====================================================
// DADOS
// =====================================================

let maquinas = [];

let maquinaEditandoId = null;


// =====================================================
// NOME DO USUÁRIO
// =====================================================

const nomeUsuario =
    localStorage.getItem("ecoFactoryNome") ||
    "Usuário";

const nomeElement =
    document.getElementById("nomeUsuario");

if (nomeElement) {

    nomeElement.textContent =
        "Olá, " + nomeUsuario;
}


// =====================================================
// AVATAR
// =====================================================

const avatar =
    document.getElementById("userAvatar");

if (avatar) {

    avatar.textContent =
        nomeUsuario
            .charAt(0)
            .toUpperCase();
}


// =====================================================
// NORMALIZAR STATUS
// =====================================================

function normalizarStatus(status) {

    const valor =
        String(status || "")
            .trim()
            .toLowerCase();


    if (
        valor === "ativa" ||
        valor === "ativo"
    ) {
        return "Ativo";
    }


    if (
        valor === "manutencao" ||
        valor === "manutenção"
    ) {
        return "Manutenção";
    }


    if (
        valor === "parada" ||
        valor === "parado"
    ) {
        return "Parada";
    }


    return status || "Ativo";
}


// =====================================================
// CLASSE DO STATUS
// =====================================================

function classeStatus(status) {

    const valor =
        normalizarStatus(status);


    if (valor === "Ativo") {
        return "ativo";
    }


    if (valor === "Manutenção") {
        return "manutencao";
    }


    if (valor === "Parada") {
        return "parada";
    }


    return "";
}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escapeHTML(valor) {

    const div =
        document.createElement("div");

    div.textContent =
        valor ?? "";

    return div.innerHTML;
}


// =====================================================
// CARREGAR MÁQUINAS DO POSTGRESQL
// =====================================================

async function carregarMaquinas() {

    try {

        const resposta =
            await fetch(
                `${API_URL}/maquinas`
            );


        if (!resposta.ok) {

            throw new Error(
                `Erro HTTP ${resposta.status}`
            );
        }


        maquinas =
            await resposta.json();


        aplicarFiltros();


    } catch (erro) {

        console.error(
            "❌ Erro ao carregar máquinas:",
            erro
        );


        alert(
            "Não foi possível carregar as máquinas.\n\nVerifique se o backend está funcionando."
        );
    }
}


// =====================================================
// RENDERIZAR MÁQUINAS
// =====================================================

function renderizarMaquinas(lista) {

    if (!tabelaMaquinas) {
        return;
    }


    tabelaMaquinas.innerHTML = "";


    // ---------------------------------------------
    // CONTADOR
    // ---------------------------------------------

    if (contador) {

        contador.textContent =
            lista.length +
            (
                lista.length === 1
                    ? " máquina"
                    : " máquinas"
            );
    }


    // ---------------------------------------------
    // PAGINAÇÃO
    // ---------------------------------------------

    const totalPaginas =
        Math.max(
            1,
            Math.ceil(
                lista.length /
                itensPorPagina
            )
        );


    if (
        paginaAtual >
        totalPaginas
    ) {
        paginaAtual =
            totalPaginas;
    }


    const inicio =
        (paginaAtual - 1) *
        itensPorPagina;


    const fim =
        inicio +
        itensPorPagina;


    const maquinasPagina =
        lista.slice(
            inicio,
            fim
        );


    // ---------------------------------------------
    // NENHUM REGISTRO
    // ---------------------------------------------

    if (
        maquinasPagina.length === 0
    ) {

        tabelaMaquinas.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center; padding:30px;">
                    Nenhuma máquina encontrada.
                </td>
            </tr>
        `;

        atualizarContadores(lista);

        atualizarPaginacao(
            totalPaginas
        );

        return;
    }


    // ---------------------------------------------
    // CRIAR LINHAS
    // ---------------------------------------------

    maquinasPagina.forEach(
        function(maquina) {

            const tr =
                document.createElement("tr");


            const status =
                normalizarStatus(
                    maquina.status
                );


            tr.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(maquina.id)}
                    </strong>
                </td>


                <td>
                    ${escapeHTML(
                        maquina.nome
                    )}
                </td>


                <td>
                    ${escapeHTML(
                        maquina.modelo || "-"
                    )}
                </td>


                <td>
                    <span class="status ${classeStatus(status)}">
                        ${escapeHTML(status)}
                    </span>
                </td>


                <td>
                    ${escapeHTML(
                        maquina.setor || "-"
                    )}
                </td>


                <td>

                    <button
                        type="button"
                        class="action-button action-edit"
                        onclick="editarMaquina(${maquina.id})"
                    >
                        Editar
                    </button>


                    <button
                        type="button"
                        class="action-button action-delete"
                        onclick="excluirMaquina(${maquina.id})"
                    >
                        Excluir
                    </button>

                </td>

            `;


            tabelaMaquinas.appendChild(
                tr
            );
        }
    );


    atualizarContadores(lista);

    atualizarPaginacao(
        totalPaginas
    );
}


// =====================================================
// CONTADORES
// =====================================================

function atualizarContadores(lista) {

    const total =
        document.getElementById(
            "totalMaquinas"
        );

    const ativos =
        document.getElementById(
            "totalAtivas"
        );

    const manutencao =
        document.getElementById(
            "totalManutencao"
        );

    const paradas =
        document.getElementById(
            "totalParadas"
        );


    let totalAtivos = 0;

    let totalManutencao = 0;

    let totalParadas = 0;


    lista.forEach(
        function(maquina) {

            const status =
                normalizarStatus(
                    maquina.status
                );


            if (
                status === "Ativo"
            ) {

                totalAtivos++;
            }


            else if (
                status === "Manutenção"
            ) {

                totalManutencao++;
            }


            else if (
                status === "Parada"
            ) {

                totalParadas++;
            }
        }
    );


    if (total) {

        total.textContent =
            lista.length;
    }


    if (ativos) {

        ativos.textContent =
            totalAtivos;
    }


    if (manutencao) {

        manutencao.textContent =
            totalManutencao;
    }


    if (paradas) {

        paradas.textContent =
            totalParadas;
    }
}


// =====================================================
// PAGINAÇÃO
// =====================================================

function atualizarPaginacao(
    totalPaginas
) {

    if (!paginas) {
        return;
    }


    paginas.innerHTML = "";


    for (
        let i = 1;
        i <= totalPaginas;
        i++
    ) {

        const botao =
            document.createElement("button");


        botao.type =
            "button";


        botao.textContent =
            i;


        if (
            i === paginaAtual
        ) {

            botao.classList.add(
                "active"
            );
        }


        botao.addEventListener(
            "click",
            function() {

                paginaAtual =
                    i;

                aplicarFiltros();
            }
        );


        paginas.appendChild(
            botao
        );
    }


    if (botaoAnterior) {

        botaoAnterior.disabled =
            paginaAtual === 1;
    }


    if (botaoProximo) {

        botaoProximo.disabled =
            paginaAtual === totalPaginas;
    }
}


// =====================================================
// FILTROS
// =====================================================

function aplicarFiltros() {

    const texto =
        busca
            ? busca.value
                .trim()
                .toLowerCase()
            : "";


    const statusSelecionado =
        filtroStatus
            ? filtroStatus.value
            : "todos";


    const tipoSelecionado =
        filtroTipo
            ? filtroTipo.value
            : "todos";


    let resultado =
        [...maquinas];


    // ---------------------------------------------
    // BUSCA
    // ---------------------------------------------

    if (texto !== "") {

        resultado =
            resultado.filter(
                function(maquina) {

                    return (

                        String(
                            maquina.id
                        )
                            .toLowerCase()
                            .includes(texto)

                        ||

                        String(
                            maquina.nome || ""
                        )
                            .toLowerCase()
                            .includes(texto)

                        ||

                        String(
                            maquina.modelo || ""
                        )
                            .toLowerCase()
                            .includes(texto)

                        ||

                        String(
                            maquina.setor || ""
                        )
                            .toLowerCase()
                            .includes(texto)
                    );
                }
            );
    }


    // ---------------------------------------------
    // FILTRO DE STATUS
    // ---------------------------------------------

    if (
        statusSelecionado !==
        "todos"
    ) {

        resultado =
            resultado.filter(
                function(maquina) {

                    return (
                        normalizarStatus(
                            maquina.status
                        ) ===
                        normalizarStatus(
                            statusSelecionado
                        )
                    );
                }
            );
    }


    // ---------------------------------------------
    // FILTRO DE TIPO
    // ---------------------------------------------

    if (
        tipoSelecionado !==
        "todos"
    ) {

        resultado =
            resultado.filter(
                function(maquina) {

                    return (
                        String(
                            maquina.modelo || ""
                        )
                            .trim()
                            .toLowerCase() ===
                        String(
                            tipoSelecionado
                        )
                            .trim()
                            .toLowerCase()
                    );
                }
            );
    }


    renderizarMaquinas(
        resultado
    );
}


// =====================================================
// NOVA MÁQUINA
// =====================================================

if (novaMaquina) {

    novaMaquina.addEventListener(
        "click",
        function() {

            maquinaEditandoId =
                null;


            limparFormulario();


            if (tituloModal) {

                tituloModal.textContent =
                    "Nova Máquina";
            }


            abrirModal();
        }
    );
}


// =====================================================
// ABRIR MODAL
// =====================================================

function abrirModal() {

    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );
}


// =====================================================
// FECHAR MODAL
// =====================================================

function fecharModalFuncao() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    maquinaEditandoId =
        null;


    limparFormulario();
}


// =====================================================
// BOTÃO X
// =====================================================

if (fecharModal) {

    fecharModal.addEventListener(
        "click",
        fecharModalFuncao
    );
}


// =====================================================
// BOTÃO CANCELAR
// =====================================================

if (cancelarModal) {

    cancelarModal.addEventListener(
        "click",
        fecharModalFuncao
    );
}


// =====================================================
// CLICAR FORA DO MODAL
// =====================================================

if (modal) {

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modal
            ) {

                fecharModalFuncao();
            }
        }
    );
}


// =====================================================
// ESC - FECHAR MODAL
// =====================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains(
                "show"
            )
        ) {

            fecharModalFuncao();
        }
    }
);


// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================

function limparFormulario() {

    if (form) {

        form.reset();
    }


    if (campoStatus) {

        campoStatus.value =
            "Ativo";
    }


    maquinaEditandoId =
        null;
}


// =====================================================
// SALVAR MÁQUINA
// =====================================================

if (form) {

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const nome =
                campoNome
                    ? campoNome.value.trim()
                    : "";


            const tipo =
                campoTipo
                    ? campoTipo.value.trim()
                    : "";


            const localizacao =
                campoLocalizacao
                    ? campoLocalizacao.value.trim()
                    : "";


            const status =
                campoStatus
                    ? campoStatus.value
                    : "Ativo";


            // -----------------------------------------
            // VALIDAÇÃO
            // -----------------------------------------

            if (!nome) {

                alert(
                    "Digite o nome da máquina."
                );

                return;
            }


            if (!tipo) {

                alert(
                    "Selecione o tipo da máquina."
                );

                return;
            }


            if (!localizacao) {

                alert(
                    "Digite a localização da máquina."
                );

                return;
            }


            // -----------------------------------------
            // DADOS
            // -----------------------------------------

            const dados = {

                nome: nome,

                modelo: tipo,

                setor: localizacao,

                status: status,

                descricao: null
            };


            try {

                let resposta;


                // =====================================
                // EDITAR
                // =====================================

                if (
                    maquinaEditandoId !== null
                ) {

                    resposta =
                        await fetch(
                            `${API_URL}/maquinas/${maquinaEditandoId}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        dados
                                    )
                            }
                        );
                }


                // =====================================
                // CADASTRAR
                // =====================================

                else {

                    resposta =
                        await fetch(
                            `${API_URL}/maquinas`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        dados
                                    )
                            }
                        );
                }


                // -----------------------------------------
                // LER RESPOSTA
                // -----------------------------------------

                let resultado = null;


                try {

                    resultado =
                        await resposta.json();

                } catch {

                    resultado = null;
                }


                // -----------------------------------------
                // ERRO
                // -----------------------------------------

                if (
                    !resposta.ok
                ) {

                    throw new Error(
                        resultado?.erro ||
                        `Erro HTTP ${resposta.status}`
                    );
                }


                // -----------------------------------------
                // SUCESSO
                // -----------------------------------------

                if (
                    maquinaEditandoId !== null
                ) {

                    alert(
                        "Máquina editada com sucesso!"
                    );

                } else {

                    alert(
                        "Máquina cadastrada com sucesso!"
                    );
                }


                fecharModalFuncao();


                await carregarMaquinas();


            } catch (erro) {

                console.error(
                    "❌ Erro ao salvar máquina:",
                    erro
                );


                alert(
                    `Erro ao salvar a máquina.\n\n${erro.message}`
                );
            }
        }
    );
}


// =====================================================
// EDITAR MÁQUINA
// =====================================================

async function editarMaquina(id) {

    try {

        const resposta =
            await fetch(
                `${API_URL}/maquinas/${id}`
            );


        if (!resposta.ok) {

            const erro =
                await resposta.json();

            throw new Error(
                erro.erro ||
                "Máquina não encontrada."
            );
        }


        const maquina =
            await resposta.json();


        if (campoNome) {

            campoNome.value =
                maquina.nome || "";
        }


        if (campoTipo) {

            campoTipo.value =
                maquina.modelo || "";
        }


        if (campoLocalizacao) {

            campoLocalizacao.value =
                maquina.setor || "";
        }


        if (campoStatus) {

            campoStatus.value =
                normalizarStatus(
                    maquina.status
                );
        }


        maquinaEditandoId =
            Number(maquina.id);


        if (tituloModal) {

            tituloModal.textContent =
                "Editar Máquina";
        }


        abrirModal();


    } catch (erro) {

        console.error(
            "❌ Erro ao abrir máquina:",
            erro
        );


        alert(
            `Não foi possível abrir a máquina.\n\n${erro.message}`
        );
    }
}


// =====================================================
// EXCLUIR MÁQUINA
// =====================================================

async function excluirMaquina(id) {

    const maquina =
        maquinas.find(
            function(item) {

                return (
                    Number(item.id) ===
                    Number(id)
                );
            }
        );


    const nome =
        maquina
            ? maquina.nome
            : `ID ${id}`;


    const confirmar =
        confirm(
            `Deseja realmente excluir a máquina "${nome}"?`
        );


    if (!confirmar) {
        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/maquinas/${id}`,
                {
                    method: "DELETE"
                }
            );


        let resultado = null;


        try {

            resultado =
                await resposta.json();

        } catch {

            resultado = null;
        }


        if (!resposta.ok) {

            throw new Error(
                resultado?.erro ||
                `Erro HTTP ${resposta.status}`
            );
        }


        alert(
            "Máquina excluída com sucesso!"
        );


        await carregarMaquinas();


    } catch (erro) {

        console.error(
            "❌ Erro ao excluir máquina:",
            erro
        );


        alert(
            `Não foi possível excluir a máquina.\n\n${erro.message}`
        );
    }
}


// =====================================================
// BUSCA
// =====================================================

if (busca) {

    busca.addEventListener(
        "input",
        function() {

            paginaAtual = 1;

            aplicarFiltros();
        }
    );
}


// =====================================================
// FILTRO STATUS
// =====================================================

if (filtroStatus) {

    filtroStatus.addEventListener(
        "change",
        function() {

            paginaAtual = 1;

            aplicarFiltros();
        }
    );
}


// =====================================================
// FILTRO TIPO
// =====================================================

if (filtroTipo) {

    filtroTipo.addEventListener(
        "change",
        function() {

            paginaAtual = 1;

            aplicarFiltros();
        }
    );
}


// =====================================================
// LIMPAR FILTROS
// =====================================================

if (limparFiltros) {

    limparFiltros.addEventListener(
        "click",
        function() {

            if (busca) {

                busca.value =
                    "";
            }


            if (filtroStatus) {

                filtroStatus.value =
                    "todos";
            }


            if (filtroTipo) {

                filtroTipo.value =
                    "todos";
            }


            paginaAtual = 1;

            aplicarFiltros();
        }
    );
}


// =====================================================
// PAGINAÇÃO - ANTERIOR
// =====================================================

if (botaoAnterior) {

    botaoAnterior.addEventListener(
        "click",
        function() {

            if (
                paginaAtual > 1
            ) {

                paginaAtual--;

                aplicarFiltros();
            }
        }
    );
}


// =====================================================
// PAGINAÇÃO - PRÓXIMO
// =====================================================

if (botaoProximo) {

    botaoProximo.addEventListener(
        "click",
        function() {

            const listaFiltrada =
                obterListaFiltrada();


            const totalPaginas =
                Math.max(
                    1,
                    Math.ceil(
                        listaFiltrada.length /
                        itensPorPagina
                    )
                );


            if (
                paginaAtual <
                totalPaginas
            ) {

                paginaAtual++;

                aplicarFiltros();
            }
        }
    );
}


// =====================================================
// OBTER LISTA FILTRADA
// =====================================================

function obterListaFiltrada() {

    const texto =
        busca
            ? busca.value
                .trim()
                .toLowerCase()
            : "";


    const statusSelecionado =
        filtroStatus
            ? filtroStatus.value
            : "todos";


    const tipoSelecionado =
        filtroTipo
            ? filtroTipo.value
            : "todos";


    let resultado =
        [...maquinas];


    if (texto !== "") {

        resultado =
            resultado.filter(
                function(maquina) {

                    return (

                        String(
                            maquina.id
                        )
                            .toLowerCase()
                            .includes(texto)

                        ||

                        String(
                            maquina.nome || ""
                        )
                            .toLowerCase()
                            .includes(texto)

                        ||

                        String(
                            maquina.modelo || ""
                        )
                            .toLowerCase()
                            .includes(texto)

                        ||

                        String(
                            maquina.setor || ""
                        )
                            .toLowerCase()
                            .includes(texto)
                    );
                }
            );
    }


    if (
        statusSelecionado !==
        "todos"
    ) {

        resultado =
            resultado.filter(
                function(maquina) {

                    return (
                        normalizarStatus(
                            maquina.status
                        ) ===
                        normalizarStatus(
                            statusSelecionado
                        )
                    );
                }
            );
    }


    if (
        tipoSelecionado !==
        "todos"
    ) {

        resultado =
            resultado.filter(
                function(maquina) {

                    return (
                        String(
                            maquina.modelo || ""
                        )
                            .trim()
                            .toLowerCase() ===
                        String(
                            tipoSelecionado
                        )
                            .trim()
                            .toLowerCase()
                    );
                }
            );
    }


    return resultado;
}


// =====================================================
// LOGOUT
// =====================================================

const logout =
    document.getElementById(
        "logout"
    );


if (logout) {

    logout.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            localStorage.removeItem(
                "ecoFactoryLogado"
            );


            localStorage.removeItem(
                "ecoFactoryNome"
            );


            window.location.href =
                "index.html";
        }
    );
}


// =====================================================
// DATA ATUAL
// =====================================================

function atualizarData() {

    const elemento =
        document.getElementById(
            "dataAtual"
        );


    if (!elemento) {
        return;
    }


    const agora =
        new Date();


    const data =
        agora.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    elemento.textContent =
        data.charAt(0).toUpperCase() +
        data.slice(1);
}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

atualizarData();

carregarMaquinas();