// =====================================================
// ECOFACTORY - PRODUÇÃO
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
// BANCO LOCAL - MÁQUINAS
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

        return Array.isArray(maquinas)
            ? maquinas
            : [];

    } catch (erro) {

        console.error(
            "Erro ao carregar máquinas:",
            erro
        );

        return [];

    }

}


// =====================================================
// BANCO LOCAL - PRODUÇÃO
// =====================================================

function obterProducoes() {

    const dados =
        localStorage.getItem("ecoFactoryProducoes");

    if (!dados) {
        return [];
    }

    try {

        const producoes =
            JSON.parse(dados);

        return Array.isArray(producoes)
            ? producoes
            : [];

    } catch (erro) {

        console.error(
            "Erro ao carregar produção:",
            erro
        );

        return [];

    }

}


// =====================================================
// SALVAR PRODUÇÕES
// =====================================================

function salvarProducoes(producoes) {

    localStorage.setItem(
        "ecoFactoryProducoes",
        JSON.stringify(producoes)
    );

}


// =====================================================
// CARREGAR MÁQUINAS NOS SELECTS
// =====================================================

function carregarMaquinas() {

    if (!maquinaProducao || !filtroMaquina) {
        return;
    }

    const maquinas =
        obterMaquinas();


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


    maquinas.forEach(function(maquina) {

        const optionCadastro =
            document.createElement("option");

        optionCadastro.value =
            maquina.id;

        optionCadastro.textContent =
            maquina.id + " - " + maquina.nome;

        maquinaProducao.appendChild(
            optionCadastro
        );


        const optionFiltro =
            document.createElement("option");

        optionFiltro.value =
            maquina.id;

        optionFiltro.textContent =
            maquina.nome;

        filtroMaquina.appendChild(
            optionFiltro
        );

    });

}


// =====================================================
// NOME DA MÁQUINA
// =====================================================

function nomeDaMaquina(id) {

    const maquinas =
        obterMaquinas();

    const maquina =
        maquinas.find(function(item) {

            return String(item.id) === String(id);

        });


    if (maquina) {
        return maquina.nome;
    }


    return "Máquina removida";

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

        }

        atualizarResumo([]);

        return;

    }


    if (semRegistros) {

        semRegistros.style.display =
            "none";

    }


    lista.forEach(function(producao) {

        const tr =
            document.createElement("tr");


        const data =
            document.createElement("td");

        data.textContent =
            formatarData(producao.data);


        const maquina =
            document.createElement("td");

        const nomeMaquina =
            document.createElement("strong");

        nomeMaquina.textContent =
            nomeDaMaquina(producao.maquinaId);

        const idMaquina =
            document.createElement("small");

        idMaquina.textContent =
            producao.maquinaId || "-";

        maquina.appendChild(nomeMaquina);
        maquina.appendChild(
            document.createElement("br")
        );
        maquina.appendChild(idMaquina);


        const produto =
            document.createElement("td");

        produto.textContent =
            producao.produto || "-";


        const quantidade =
            document.createElement("td");

        const quantidadeStrong =
            document.createElement("strong");

        quantidadeStrong.textContent =
            Number(
                producao.quantidade
            ).toLocaleString("pt-BR");

        quantidade.appendChild(
            quantidadeStrong
        );


        const turno =
            document.createElement("td");

        const turnoSpan =
            document.createElement("span");

        turnoSpan.className =
            "turno";

        turnoSpan.textContent =
            producao.turno || "-";

        turno.appendChild(
            turnoSpan
        );


        const acoes =
            document.createElement("td");


        const excluir =
            document.createElement("button");

        excluir.type = "button";

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


        acoes.appendChild(excluir);


        tr.appendChild(data);
        tr.appendChild(maquina);
        tr.appendChild(produto);
        tr.appendChild(quantidade);
        tr.appendChild(turno);
        tr.appendChild(acoes);


        tabelaProducao.appendChild(tr);

    });


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


    lista.forEach(function(item) {

        total +=
            Number(item.quantidade) || 0;

    });


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
            total.toLocaleString("pt-BR");

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
                .toLocaleString("pt-BR");

    }

}


// =====================================================
// APLICAR FILTROS
// =====================================================

function aplicarFiltros() {

    let producoes =
        obterProducoes();


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
        maquinaSelecionada !== "todos"
    ) {

        producoes =
            producoes.filter(function(item) {

                return String(
                    item.maquinaId
                ) === String(
                    maquinaSelecionada
                );

            });

    }


    // FILTRO PRODUTO

    if (produtoTexto !== "") {

        producoes =
            producoes.filter(function(item) {

                return String(
                    item.produto || ""
                )
                .toLowerCase()
                .includes(
                    produtoTexto
                );

            });

    }


    // DATA INICIAL

    if (inicio !== "") {

        producoes =
            producoes.filter(function(item) {

                return item.data >= inicio;

            });

    }


    // DATA FINAL

    if (fim !== "") {

        producoes =
            producoes.filter(function(item) {

                return item.data <= fim;

            });

    }


    renderizarProducoes(
        producoes
    );

}


// =====================================================
// ABRIR MODAL
// =====================================================

if (novaProducao) {

    novaProducao.addEventListener(
        "click",
        function() {

            carregarMaquinas();

            if (form) {
                form.reset();
            }

            const mensagem =
                document.getElementById(
                    "mensagemProducao"
                );

            if (mensagem) {
                mensagem.textContent = "";
                mensagem.className = "mensagem";
            }

            if (modal) {
                modal.classList.add("show");
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
                modal.classList.remove("show");
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
// CADASTRAR PRODUÇÃO
// =====================================================

if (form) {

    form.addEventListener(
        "submit",
        function(event) {

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
                !Number.isFinite(quantidade) ||
                quantidade <= 0 ||
                !turno
            ) {

                mostrarMensagem(
                    "Preencha todos os campos corretamente.",
                    "erro"
                );

                return;

            }


            const producoes =
                obterProducoes();


            const nova = {

                id:
                    "PRD-" +
                    Date.now(),

                data:
                    data,

                maquinaId:
                    maquinaId,

                produto:
                    produto,

                quantidade:
                    quantidade,

                turno:
                    turno

            };


            producoes.push(nova);


            salvarProducoes(
                producoes
            );


            mostrarMensagem(
                "Produção cadastrada com sucesso!",
                "sucesso"
            );


            setTimeout(
                function() {

                    if (modal) {

                        modal.classList.remove(
                            "show"
                        );

                    }

                    form.reset();


                    carregarMaquinas();


                    renderizarProducoes(
                        obterProducoes()
                    );

                },
                700
            );

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

function excluirProducao(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir este registro?"
        );


    if (!confirmar) {
        return;
    }


    let producoes =
        obterProducoes();


    producoes =
        producoes.filter(function(item) {

            return item.id !== id;

        });


    salvarProducoes(
        producoes
    );


    aplicarFiltros();

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


if (limparFiltros) {

    limparFiltros.addEventListener(
        "click",
        function() {

            if (dataInicio) {
                dataInicio.value = "";
            }

            if (dataFim) {
                dataFim.value = "";
            }

            if (filtroMaquina) {
                filtroMaquina.value = "todos";
            }

            if (filtroProduto) {
                filtroProduto.value = "";
            }


            renderizarProducoes(
                obterProducoes()
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
// INICIALIZAÇÃO
// =====================================================

carregarMaquinas();

renderizarProducoes(
    obterProducoes()
);