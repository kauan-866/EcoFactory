// =====================================================
// ECOFACTORY - PRODUÇÃO
// =====================================================


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const API_URL = "http://localhost:3000";


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

const tabelaProducao =
    document.getElementById("tabelaProducao");

const contador =
    document.getElementById("contador");

const modal =
    document.getElementById("modalProducao");

const novaProducao =
    document.getElementById("novaProducao");

const fecharModal =
    document.getElementById("fecharModal");

const form =
    document.getElementById("formProducao");

const maquinaProducao =
    document.getElementById("maquinaProducao");

const filtroMaquina =
    document.getElementById("filtroMaquina");

const filtroProduto =
    document.getElementById("filtroProduto");

const dataInicio =
    document.getElementById("dataInicio");

const dataFim =
    document.getElementById("dataFim");

const buscar =
    document.getElementById("buscar");

const limparFiltros =
    document.getElementById("limparFiltros");

const semRegistros =
    document.getElementById("semRegistros");


// =====================================================
// DADOS
// =====================================================

let producoes = [];

let maquinas = [];


// =====================================================
// NOME DO USUÁRIO
// =====================================================

const nomeUsuario =
    localStorage.getItem("ecoFactoryNome") ||
    "Cliente";

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
// CARREGAR MÁQUINAS DO BANCO
// =====================================================

async function carregarMaquinas() {

    try {

        const resposta =
            await fetch(
                `${API_URL}/maquinas`
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar máquinas"
            );

        }


        maquinas =
            await resposta.json();


        preencherSelectMaquinas();


    } catch (erro) {

        console.error(
            "❌ Erro ao carregar máquinas:",
            erro
        );

        mostrarMensagem(
            "Não foi possível carregar as máquinas.",
            "erro"
        );

    }

}


// =====================================================
// PREENCHER SELECTS
// =====================================================

function preencherSelectMaquinas() {

    if (
        !maquinaProducao ||
        !filtroMaquina
    ) {
        return;
    }


    maquinaProducao.innerHTML = `
        <option value="">
            Selecione uma máquina
        </option>
    `;


    filtroMaquina.innerHTML = `
        <option value="todos">
            Todas
        </option>
    `;


    maquinas.forEach(
        function(maquina) {

            const optionCadastro =
                document.createElement(
                    "option"
                );


            optionCadastro.value =
                maquina.id;


            optionCadastro.textContent =
                maquina.id +
                " - " +
                maquina.nome;


            maquinaProducao.appendChild(
                optionCadastro
            );


            const optionFiltro =
                document.createElement(
                    "option"
                );


            optionFiltro.value =
                maquina.id;


            optionFiltro.textContent =
                maquina.nome;


            filtroMaquina.appendChild(
                optionFiltro
            );

        }
    );

}


// =====================================================
// NOME DA MÁQUINA
// =====================================================

function nomeDaMaquina(id) {

    const maquina =
        maquinas.find(
            function(item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (maquina) {

        return maquina.nome;

    }


    return "Máquina removida";

}


// =====================================================
// CARREGAR PRODUÇÕES DO BANCO
// =====================================================

async function carregarProducoes() {

    try {

        const resposta =
            await fetch(
                `${API_URL}/producoes`
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar produções"
            );

        }


        producoes =
            await resposta.json();


        renderizarProducoes(
            producoes
        );


    } catch (erro) {

        console.error(
            "❌ Erro ao carregar produções:",
            erro
        );


        if (tabelaProducao) {

            tabelaProducao.innerHTML = "";

        }


        if (semRegistros) {

            semRegistros.style.display =
                "block";

            semRegistros.textContent =
                "Erro ao carregar os registros.";

        }

    }

}


// =====================================================
// RENDERIZAR TABELA
// =====================================================

function renderizarProducoes(lista) {

    if (!tabelaProducao) {
        return;
    }


    tabelaProducao.innerHTML = "";


    if (contador) {

        contador.textContent =
            lista.length +
            (
                lista.length === 1
                    ? " registro"
                    : " registros"
            );

    }


    if (lista.length === 0) {

        if (semRegistros) {

            semRegistros.style.display =
                "block";

            semRegistros.textContent =
                "Nenhum registro encontrado.";

        }


        atualizarResumo([]);

        return;

    }


    if (semRegistros) {

        semRegistros.style.display =
            "none";

    }


    lista.forEach(
        function(producao) {

            const tr =
                document.createElement(
                    "tr"
                );


            // DATA

            const data =
                document.createElement(
                    "td"
                );

            data.textContent =
                formatarData(
                    producao.data_producao
                );


            // MÁQUINA

            const maquina =
                document.createElement(
                    "td"
                );


            const nomeMaquina =
                document.createElement(
                    "strong"
                );


            nomeMaquina.textContent =
                producao.maquina ||
                nomeDaMaquina(
                    producao.maquina_id
                );


            const idMaquina =
                document.createElement(
                    "small"
                );


            idMaquina.textContent =
                producao.maquina_id ||
                "-";


            maquina.appendChild(
                nomeMaquina
            );


            maquina.appendChild(
                document.createElement(
                    "br"
                )
            );


            maquina.appendChild(
                idMaquina
            );


            // PRODUTO

            const produto =
                document.createElement(
                    "td"
                );


            produto.textContent =
                producao.produto ||
                "-";


            // QUANTIDADE

            const quantidade =
                document.createElement(
                    "td"
                );


            const quantidadeStrong =
                document.createElement(
                    "strong"
                );


            quantidadeStrong.textContent =
                Number(
                    producao.quantidade
                ).toLocaleString(
                    "pt-BR"
                );


            quantidade.appendChild(
                quantidadeStrong
            );


            // TURNO

            const turno =
                document.createElement(
                    "td"
                );


            const turnoSpan =
                document.createElement(
                    "span"
                );


            turnoSpan.className =
                "turno";


            turnoSpan.textContent =
                producao.turno ||
                "-";


            turno.appendChild(
                turnoSpan
            );


            // AÇÕES

            const acoes =
                document.createElement(
                    "td"
                );


            const excluir =
                document.createElement(
                    "button"
                );


            excluir.type =
                "button";


            excluir.className =
                "action-button action-delete delete";


            excluir.title =
                "Excluir produção";


            excluir.textContent =
                "🗑";


            excluir.addEventListener(
                "click",
                function() {

                    excluirProducao(
                        producao.id
                    );

                }
            );


            acoes.appendChild(
                excluir
            );


            // ADICIONAR LINHA

            tr.appendChild(data);

            tr.appendChild(maquina);

            tr.appendChild(produto);

            tr.appendChild(quantidade);

            tr.appendChild(turno);

            tr.appendChild(acoes);


            tabelaProducao.appendChild(
                tr
            );

        }
    );


    atualizarResumo(lista);

}


// =====================================================
// FORMATAR DATA
// =====================================================

function formatarData(data) {

    if (!data) {
        return "-";
    }


    const partes =
        String(data).split("-");


    if (partes.length !== 3) {

        return data;

    }


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// =====================================================
// RESUMO
// =====================================================

function atualizarResumo(lista) {

    let total = 0;


    lista.forEach(
        function(item) {

            total +=
                Number(
                    item.quantidade
                ) || 0;

        }
    );


    const totalElement =
        document.getElementById(
            "producaoTotal"
        );


    const registrosElement =
        document.getElementById(
            "totalRegistros"
        );


    const mediaElement =
        document.getElementById(
            "mediaProducao"
        );


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString(
                "pt-BR"
            );

    }


    if (registrosElement) {

        registrosElement.textContent =
            lista.length;

    }


    if (mediaElement) {

        const media =
            lista.length > 0
                ? total / lista.length
                : 0;


        mediaElement.textContent =
            Math.round(media)
                .toLocaleString(
                    "pt-BR"
                );

    }

}


// =====================================================
// APLICAR FILTROS
// =====================================================

function aplicarFiltros() {

    let lista =
        [...producoes];


    const maquinaSelecionada =
        filtroMaquina
            ? filtroMaquina.value
            : "todos";


    const produtoTexto =
        filtroProduto
            ? filtroProduto.value
                .trim()
                .toLowerCase()
            : "";


    const inicio =
        dataInicio
            ? dataInicio.value
            : "";


    const fim =
        dataFim
            ? dataFim.value
            : "";


    // FILTRO MÁQUINA

    if (
        maquinaSelecionada !==
        "todos"
    ) {

        lista =
            lista.filter(
                function(item) {

                    return String(
                        item.maquina_id
                    ) ===
                    String(
                        maquinaSelecionada
                    );

                }
            );

    }


    // FILTRO PRODUTO

    if (
        produtoTexto !== ""
    ) {

        lista =
            lista.filter(
                function(item) {

                    return String(
                        item.produto || ""
                    )
                    .toLowerCase()
                    .includes(
                        produtoTexto
                    );

                }
            );

    }


    // DATA INICIAL

    if (inicio !== "") {

        lista =
            lista.filter(
                function(item) {

                    return String(
                        item.data_producao
                    ) >= inicio;

                }
            );

    }


    // DATA FINAL

    if (fim !== "") {

        lista =
            lista.filter(
                function(item) {

                    return String(
                        item.data_producao
                    ) <= fim;

                }
            );

    }


    renderizarProducoes(
        lista
    );

}


// =====================================================
// ABRIR MODAL
// =====================================================

if (novaProducao) {

    novaProducao.addEventListener(
        "click",
        function() {

            if (form) {

                form.reset();

            }


            const mensagem =
                document.getElementById(
                    "mensagemProducao"
                );


            if (mensagem) {

                mensagem.textContent =
                    "";

                mensagem.className =
                    "mensagem";

            }


            if (modal) {

                modal.classList.add(
                    "show"
                );

            }

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

            if (modal) {

                modal.classList.remove(
                    "show"
                );

            }

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
                event.target ===
                modal
            ) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =====================================================
// CADASTRAR PRODUÇÃO
// =====================================================

if (form) {

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const data =
                document.getElementById(
                    "dataProducao"
                ).value;


            const maquinaId =
                maquinaProducao.value;


            const produto =
                document.getElementById(
                    "produtoProducao"
                ).value.trim();


            const quantidade =
                Number(
                    document.getElementById(
                        "quantidadeProducao"
                    ).value
                );


            const turno =
                document.getElementById(
                    "turnoProducao"
                ).value;


            // VALIDAÇÃO

            if (
                !data ||
                !maquinaId ||
                !produto ||
                !Number.isFinite(
                    quantidade
                ) ||
                quantidade <= 0 ||
                !Number.isInteger(
                    quantidade
                ) ||
                !turno
            ) {

                mostrarMensagem(
                    "Preencha todos os campos corretamente.",
                    "erro"
                );

                return;

            }


            try {

                const resposta =
                    await fetch(
                        `${API_URL}/producoes`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    maquina_id:
                                        Number(
                                            maquinaId
                                        ),

                                    produto:
                                        produto,

                                    quantidade:
                                        quantidade,

                                    data_producao:
                                        data,

                                    turno:
                                        turno
                                })
                        }
                    );


                const dados =
                    await resposta.json();


                if (!resposta.ok) {

                    throw new Error(
                        dados.erro ||
                        "Erro ao cadastrar produção"
                    );

                }


                mostrarMensagem(
                    "Produção cadastrada com sucesso!",
                    "sucesso"
                );


                await carregarProducoes();


                setTimeout(
                    function() {

                        if (modal) {

                            modal.classList.remove(
                                "show"
                            );

                        }


                        form.reset();

                    },
                    700
                );


            } catch (erro) {

                console.error(
                    "❌ Erro:",
                    erro
                );


                mostrarMensagem(
                    erro.message ||
                    "Erro ao cadastrar produção.",
                    "erro"
                );

            }

        }
    );

}


// =====================================================
// MENSAGEM
// =====================================================

function mostrarMensagem(
    texto,
    tipo
) {

    const mensagem =
        document.getElementById(
            "mensagemProducao"
        );


    if (!mensagem) {
        return;
    }


    mensagem.textContent =
        texto;


    mensagem.className =
        "mensagem " + tipo;

}


// =====================================================
// EXCLUIR PRODUÇÃO
// =====================================================

async function excluirProducao(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir este registro?"
        );


    if (!confirmar) {
        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/producoes/${id}`,
                {
                    method: "DELETE"
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                "Erro ao excluir produção"
            );

        }


        await carregarProducoes();


    } catch (erro) {

        console.error(
            "❌ Erro ao excluir:",
            erro
        );


        alert(
            erro.message ||
            "Erro ao excluir produção."
        );

    }

}


// =====================================================
// FILTROS
// =====================================================

if (buscar) {

    buscar.addEventListener(
        "click",
        aplicarFiltros
    );

}


if (filtroMaquina) {

    filtroMaquina.addEventListener(
        "change",
        aplicarFiltros
    );

}


if (filtroProduto) {

    filtroProduto.addEventListener(
        "input",
        aplicarFiltros
    );

}


if (dataInicio) {

    dataInicio.addEventListener(
        "change",
        aplicarFiltros
    );

}


if (dataFim) {

    dataFim.addEventListener(
        "change",
        aplicarFiltros
    );

}


if (limparFiltros) {

    limparFiltros.addEventListener(
        "click",
        function() {

            if (dataInicio) {

                dataInicio.value =
                    "";

            }


            if (dataFim) {

                dataFim.value =
                    "";

            }


            if (filtroMaquina) {

                filtroMaquina.value =
                    "todos";

            }


            if (filtroProduto) {

                filtroProduto.value =
                    "";

            }


            renderizarProducoes(
                producoes
            );

        }
    );

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
// INICIALIZAÇÃO
// =====================================================

async function iniciar() {

    await carregarMaquinas();

    await carregarProducoes();

}


iniciar();