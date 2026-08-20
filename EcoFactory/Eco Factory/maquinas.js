// =====================================================
// ECOFACTORY - MÁQUINAS
// =====================================================


// =====================================================
// VERIFICAR LOGIN
// =====================================================

if (
    localStorage.getItem("ecoFactoryLogado") !== "true"
) {

    window.location.href = "index.html";

}


// =====================================================
// ELEMENTOS
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

const form =
    document.getElementById("formMaquina");

const filtroStatus =
    document.getElementById("filtroStatus");

const busca =
    document.getElementById("busca");

const limparFiltros =
    document.getElementById("limparFiltros");

const semRegistros =
    document.getElementById("semRegistros");


// =====================================================
// CAMPOS DO FORMULÁRIO
// =====================================================

const campoNome =
    document.getElementById("nomeMaquina");

const campoModelo =
    document.getElementById("modeloMaquina");

const campoSetor =
    document.getElementById("setorMaquina");

const campoStatus =
    document.getElementById("statusMaquina");


// =====================================================
// NOME DO USUÁRIO
// =====================================================

const nomeUsuario =
    localStorage.getItem("ecoFactoryNome") || "Cliente";

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
// BANCO LOCAL
// =====================================================

function obterMaquinas() {

    const dados =
        localStorage.getItem("ecoFactoryMaquinas");

    if (!dados) {

        return [];

    }

    try {

        const maquinas =
            JSON.parse(dados);

        if (!Array.isArray(maquinas)) {

            return [];

        }

        return maquinas;

    } catch (erro) {

        console.error(
            "Erro ao carregar máquinas:",
            erro
        );

        return [];

    }

}


// =====================================================
// SALVAR MÁQUINAS
// =====================================================

function salvarMaquinas(maquinas) {

    localStorage.setItem(
        "ecoFactoryMaquinas",
        JSON.stringify(maquinas)
    );

}


// =====================================================
// STATUS
// =====================================================

function normalizarStatus(status) {

    if (!status) {

        return "Ativo";

    }

    if (status === "Manutencao") {

        return "Manutenção";

    }

    if (
        status === "ativo" ||
        status === "ATIVO"
    ) {

        return "Ativo";

    }

    if (
        status === "manutencao" ||
        status === "MANUTENCAO"
    ) {

        return "Manutenção";

    }

    if (
        status === "parada" ||
        status === "PARADA"
    ) {

        return "Parada";

    }

    return status;

}


// =====================================================
// CLASSE DO STATUS
// =====================================================

function classeStatus(status) {

    status =
        normalizarStatus(status);

    if (status === "Ativo") {

        return "ativo";

    }

    if (status === "Manutenção") {

        return "manutencao";

    }

    if (status === "Parada") {

        return "parada";

    }

    return "ativo";

}


// =====================================================
// RENDERIZAR TABELA
// =====================================================

function renderizarMaquinas(lista) {

    if (!tabelaMaquinas) {

        return;

    }

    tabelaMaquinas.innerHTML = "";

    if (contador) {

        contador.textContent =
            lista.length +
            (
                lista.length === 1
                    ? " máquina"
                    : " máquinas"
            );

    }


    if (lista.length === 0) {

        if (semRegistros) {

            semRegistros.style.display =
                "block";

        }

        atualizarContadores([]);

        return;

    }


    if (semRegistros) {

        semRegistros.style.display =
            "none";

    }


    lista.forEach(function(maquina) {

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
                ${escapeHTML(maquina.nome)}
            </td>

            <td>
                ${escapeHTML(
                    maquina.modelo || "-"
                )}
            </td>

            <td>
                ${escapeHTML(
                    maquina.setor || "-"
                )}
            </td>

            <td>

                <span class="status ${classeStatus(status)}">

                    ${status}

                </span>

            </td>

            <td>

                <button
                    class="action-button action-edit"
                    onclick="editarMaquina('${maquina.id}')">

                    Editar

                </button>

                <button
                    class="action-button action-delete"
                    onclick="excluirMaquina('${maquina.id}')">

                    Excluir

                </button>

            </td>

        `;

        tabelaMaquinas.appendChild(tr);

    });


    atualizarContadores(lista);

}


// =====================================================
// CONTADORES
// =====================================================

function atualizarContadores(lista) {

    const total =
        document.getElementById("totalMaquinas");

    const ativos =
        document.getElementById("maquinasAtivas");

    const manutencao =
        document.getElementById("maquinasManutencao");

    const paradas =
        document.getElementById("maquinasParadas");


    let totalAtivos = 0;
    let totalManutencao = 0;
    let totalParadas = 0;


    lista.forEach(function(maquina) {

        const status =
            normalizarStatus(
                maquina.status
            );

        if (status === "Ativo") {

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

    });


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
// ESCAPAR HTML
// =====================================================

function escapeHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto ?? "";

    return div.innerHTML;

}


// =====================================================
// ABRIR MODAL - NOVA MÁQUINA
// =====================================================

if (novaMaquina) {

    novaMaquina.addEventListener(
        "click",
        function() {

            limparFormulario();

            modal.classList.add("show");

        }
    );

}


// =====================================================
// FECHAR MODAL
// =====================================================

if (fecharModal) {

    fecharModal.addEventListener(
        "click",
        function() {

            modal.classList.remove(
                "show"
            );

        }
    );

}


// =====================================================
// FECHAR CLICANDO FORA
// =====================================================

if (modal) {

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );

}


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


    const idEditando =
        document.getElementById(
            "idMaquina"
        );

    if (idEditando) {

        idEditando.value = "";

    }


    const titulo =
        document.getElementById(
            "tituloModal"
        );

    if (titulo) {

        titulo.textContent =
            "Nova Máquina";

    }

}


// =====================================================
// CADASTRAR / EDITAR
// =====================================================

if (form) {

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nome =
                campoNome
                    ? campoNome.value.trim()
                    : "";

            const modelo =
                campoModelo
                    ? campoModelo.value.trim()
                    : "";

            const setor =
                campoSetor
                    ? campoSetor.value.trim()
                    : "";

            const status =
                campoStatus
                    ? normalizarStatus(
                        campoStatus.value
                    )
                    : "Ativo";


            if (!nome) {

                alert(
                    "Digite o nome da máquina."
                );

                return;

            }


            if (!status) {

                alert(
                    "Selecione o status da máquina."
                );

                return;

            }


            let maquinas =
                obterMaquinas();


            const idEditando =
                document.getElementById(
                    "idMaquina"
                );


            const idAtual =
                idEditando
                    ? idEditando.value
                    : "";


            // =================================================
            // EDITAR
            // =================================================

            if (idAtual) {

                const indice =
                    maquinas.findIndex(
                        function(item) {

                            return item.id === idAtual;

                        }
                    );


                if (indice !== -1) {

                    maquinas[indice].nome =
                        nome;

                    maquinas[indice].modelo =
                        modelo;

                    maquinas[indice].setor =
                        setor;

                    // IMPORTANTE:
                    // mantém o status escolhido
                    maquinas[indice].status =
                        status;

                }

            }


            // =================================================
            // NOVA MÁQUINA
            // =================================================

            else {

                const nova = {

                    id:
                        gerarId(maquinas),

                    nome:
                        nome,

                    modelo:
                        modelo,

                    setor:
                        setor,

                    status:
                        status

                };


                maquinas.push(nova);

            }


            salvarMaquinas(
                maquinas
            );


            modal.classList.remove(
                "show"
            );


            limparFormulario();


            renderizarMaquinas(
                obterMaquinas()
            );


            // Atualiza outras páginas/componentes
            window.dispatchEvent(
                new Event("storage")
            );

        }
    );

}


// =====================================================
// GERAR ID
// =====================================================

function gerarId(maquinas) {

    let numero = 1;


    while (true) {

        const id =
            "M-" +
            String(numero).padStart(
                2,
                "0"
            );


        const existe =
            maquinas.some(
                function(maquina) {

                    return maquina.id === id;

                }
            );


        if (!existe) {

            return id;

        }


        numero++;

    }

}


// =====================================================
// EDITAR MÁQUINA
// =====================================================

function editarMaquina(id) {

    const maquinas =
        obterMaquinas();


    const maquina =
        maquinas.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!maquina) {

        alert(
            "Máquina não encontrada."
        );

        return;

    }


    if (campoNome) {

        campoNome.value =
            maquina.nome || "";

    }


    if (campoModelo) {

        campoModelo.value =
            maquina.modelo || "";

    }


    if (campoSetor) {

        campoSetor.value =
            maquina.setor || "";

    }


    if (campoStatus) {

        campoStatus.value =
            normalizarStatus(
                maquina.status
            );

    }


    const idEditando =
        document.getElementById(
            "idMaquina"
        );


    if (idEditando) {

        idEditando.value =
            maquina.id;

    }


    const titulo =
        document.getElementById(
            "tituloModal"
        );


    if (titulo) {

        titulo.textContent =
            "Editar Máquina";

    }


    modal.classList.add(
        "show"
    );

}


// =====================================================
// EXCLUIR MÁQUINA
// =====================================================

function excluirMaquina(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir esta máquina?"
        );


    if (!confirmar) {

        return;

    }


    let maquinas =
        obterMaquinas();


    maquinas =
        maquinas.filter(
            function(item) {

                return item.id !== id;

            }
        );


    salvarMaquinas(
        maquinas
    );


    renderizarMaquinas(
        maquinas
    );

}


// =====================================================
// BUSCA E FILTRO
// =====================================================

function aplicarFiltros() {

    let maquinas =
        obterMaquinas();


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


    if (texto !== "") {

        maquinas =
            maquinas.filter(
                function(maquina) {

                    return (

                        String(
                            maquina.id
                        )
                        .toLowerCase()
                        .includes(texto)

                        ||

                        String(
                            maquina.nome
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

        maquinas =
            maquinas.filter(
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


    renderizarMaquinas(
        maquinas
    );

}


// =====================================================
// EVENTOS DOS FILTROS
// =====================================================

if (busca) {

    busca.addEventListener(
        "input",
        aplicarFiltros
    );

}


if (filtroStatus) {

    filtroStatus.addEventListener(
        "change",
        aplicarFiltros
    );

}


if (limparFiltros) {

    limparFiltros.addEventListener(
        "click",
        function() {

            if (busca) {

                busca.value = "";

            }


            if (filtroStatus) {

                filtroStatus.value =
                    "todos";

            }


            renderizarMaquinas(
                obterMaquinas()
            );

        }
    );

}


// =====================================================
// LOGOUT
// =====================================================

const logout =
    document.getElementById("logout");


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
// ATUALIZAÇÃO AUTOMÁTICA
// =====================================================

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key ===
            "ecoFactoryMaquinas"
        ) {

            renderizarMaquinas(
                obterMaquinas()
            );

        }

    }
);


// =====================================================
// INICIALIZAÇÃO
// =====================================================

renderizarMaquinas(
    obterMaquinas()
);