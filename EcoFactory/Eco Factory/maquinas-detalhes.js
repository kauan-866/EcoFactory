// ======================================================
// ECOFACTORY - DETALHES DA MÁQUINA
// ======================================================


// ======================================================
// VERIFICAR LOGIN
// ======================================================

if (
    localStorage.getItem("ecoFactoryLogado") !== "true"
) {

    window.location.href = "index.html";

}


// ======================================================
// PEGAR ID DA URL
// ======================================================

const parametros =
    new URLSearchParams(window.location.search);

let idMaquina =
    parametros.get("id");


// Se não tiver ID na URL,
// pega a última máquina selecionada.

if (!idMaquina) {

    idMaquina =
        localStorage.getItem(
            "ecoFactoryMaquinaSelecionada"
        );

}


// ======================================================
// CARREGAR MÁQUINAS
// ======================================================

const maquinas =
    JSON.parse(
        localStorage.getItem(
            "ecoFactoryMaquinas"
        )
    ) || [];


// ======================================================
// ENCONTRAR MÁQUINA
// ======================================================

const maquina =
    maquinas.find(
        item => item.id === idMaquina
    );


// ======================================================
// SE NÃO ENCONTRAR
// ======================================================

if (!maquina) {

    alert(
        "Máquina não encontrada."
    );

    window.location.href =
        "maquinas.html";

}


// ======================================================
// ELEMENTOS
// ======================================================

const titulo =
    document.getElementById(
        "tituloMaquina"
    );

const subtitulo =
    document.getElementById(
        "subtituloMaquina"
    );

const infoId =
    document.getElementById(
        "infoId"
    );

const infoNome =
    document.getElementById(
        "infoNome"
    );

const infoTipo =
    document.getElementById(
        "infoTipo"
    );

const infoStatus =
    document.getElementById(
        "infoStatus"
    );

const infoLocalizacao =
    document.getElementById(
        "infoLocalizacao"
    );

const infoData =
    document.getElementById(
        "infoData"
    );

const infoManutencao =
    document.getElementById(
        "infoManutencao"
    );

const infoResponsavel =
    document.getElementById(
        "infoResponsavel"
    );

const infoDescricao =
    document.getElementById(
        "infoDescricao"
    );

const statusDetalhe =
    document.getElementById(
        "statusDetalhe"
    );

const nomeUsuario =
    document.getElementById(
        "nomeUsuario"
    );


// ======================================================
// NOME DO USUÁRIO
// ======================================================

const usuario =
    localStorage.getItem(
        "ecoFactoryNome"
    ) || "Cliente";


if (nomeUsuario) {

    nomeUsuario.textContent =
        "Olá, " + usuario;

}


// ======================================================
// PREENCHER DADOS
// ======================================================

if (maquina) {

    titulo.textContent =
        maquina.nome;

    subtitulo.textContent =
        "Início / Máquinas / " +
        maquina.id;


    infoId.textContent =
        maquina.id;

    infoNome.textContent =
        maquina.nome;

    infoTipo.textContent =
        maquina.tipo;

    infoStatus.textContent =
        maquina.status;

    infoLocalizacao.textContent =
        maquina.localizacao;

    infoData.textContent =
        maquina.dataInstalacao;

    infoManutencao.textContent =
        maquina.ultimaManutencao;

    infoResponsavel.textContent =
        maquina.responsavel;

    infoDescricao.textContent =
        maquina.descricao;

    statusDetalhe.textContent =
        maquina.status;


    // Cor do status

    if (
        maquina.status === "Ativo"
    ) {

        statusDetalhe.style.color =
            "#20a447";

        infoStatus.style.color =
            "#20a447";

    }

    else if (
        maquina.status === "Manutenção"
    ) {

        statusDetalhe.style.color =
            "#e0a400";

        infoStatus.style.color =
            "#e0a400";

    }

    else {

        statusDetalhe.style.color =
            "#d93025";

        infoStatus.style.color =
            "#d93025";

    }

}


// ======================================================
// REGISTRAR MANUTENÇÃO
// ======================================================

const botaoManutencao =
    document.getElementById(
        "novaManutencao"
    );


if (botaoManutencao) {

    botaoManutencao.addEventListener(
        "click",
        function() {

            const descricao =
                prompt(
                    "Descrição da manutenção:"
                );


            if (!descricao) return;


            const tipo =
                prompt(
                    "Tipo de manutenção:",
                    "Preventiva"
                ) || "Preventiva";


            const responsavel =
                localStorage.getItem(
                    "ecoFactoryNome"
                ) || "Administrador";


            const data =
                new Date().toLocaleDateString(
                    "pt-BR"
                );


            const historico =
                JSON.parse(
                    localStorage.getItem(
                        "ecoFactoryHistorico_" +
                        maquina.id
                    )
                ) || [];


            historico.unshift({

                data: data,

                tipo: tipo,

                descricao: descricao,

                responsavel: responsavel

            });


            localStorage.setItem(

                "ecoFactoryHistorico_" +
                maquina.id,

                JSON.stringify(historico)

            );


            // Atualiza a máquina

            maquina.ultimaManutencao =
                data;

            maquina.status =
                "Ativo";


            localStorage.setItem(

                "ecoFactoryMaquinas",

                JSON.stringify(maquinas)

            );


            alert(
                "Manutenção registrada com sucesso!"
            );


            location.reload();

        }
    );

}


// ======================================================
// CARREGAR HISTÓRICO
// ======================================================

function carregarHistorico() {

    const tabela =
        document.getElementById(
            "historicoTabela"
        );


    if (!tabela || !maquina) return;


    const historico =
        JSON.parse(
            localStorage.getItem(
                "ecoFactoryHistorico_" +
                maquina.id
            )
        ) || [];


    if (historico.length === 0) {

        return;

    }


    tabela.innerHTML = "";


    historico.forEach(
        function(item) {

            const linha =
                document.createElement(
                    "tr"
                );


            linha.innerHTML = `

                <td>
                    ${item.data}
                </td>

                <td>
                    ${item.tipo}
                </td>

                <td>
                    ${item.descricao}
                </td>

                <td>
                    ${item.responsavel}
                </td>

            `;


            tabela.appendChild(
                linha
            );

        }
    );

}


carregarHistorico();


// ======================================================
// LOGOUT
// ======================================================

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

            localStorage.removeItem(
                "ecoFactoryMaquinaSelecionada"
            );


            window.location.href =
                "index.html";

        }
    );

}


console.log(
    "EcoFactory - Detalhes da máquina carregado."
);