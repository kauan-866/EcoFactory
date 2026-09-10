// =====================================================
// ECOFACTORY - DASHBOARD
// =====================================================


// =====================================================
// CONFIGURAÇÃO DA API
// =====================================================

const API_URL = "http://127.0.0.1:3000";


// =====================================================
// VERIFICAR LOGIN
// =====================================================

if (localStorage.getItem("ecoFactoryLogado") !== "true") {
    window.location.href = "index.html";
}


// =====================================================
// ELEMENTOS
// =====================================================

const totalMaquinas =
    document.getElementById("totalMaquinas");

const totalProducao =
    document.getElementById("totalProducao");

const maquinasAtivas =
    document.getElementById("maquinasAtivas");

const maquinasManutencao =
    document.getElementById("maquinasManutencao");

const maquinasParadas =
    document.getElementById("maquinasParadas");

const userName =
    document.getElementById("userName");

const userAvatar =
    document.getElementById("userAvatar");

const logout =
    document.getElementById("logout");


// =====================================================
// CARREGAR NOME DO USUÁRIO
// =====================================================

function carregarUsuario() {

    let nome =
        localStorage.getItem("ecoFactoryNome");


    // Tentar pegar do usuário cadastrado

    if (!nome) {

        const usuarioSalvo =
            localStorage.getItem("ecoFactoryUsuario");

        if (usuarioSalvo) {

            try {

                const usuario =
                    JSON.parse(usuarioSalvo);

                if (usuario && usuario.nome) {
                    nome = usuario.nome;
                }

            } catch (erro) {

                console.error(
                    "Erro ao carregar usuário:",
                    erro
                );

            }

        }

    }


    // Nome padrão

    if (!nome) {
        nome = "Usuário";
    }


    // Mostrar nome

    if (userName) {
        userName.textContent = nome;
    }


    // Mostrar primeira letra no avatar

    if (userAvatar) {

        userAvatar.textContent =
            nome.trim().charAt(0).toUpperCase();

    }

}


// =====================================================
// CARREGAR MÁQUINAS DO BANCO DE DADOS
// =====================================================

async function carregarMaquinas() {

    try {

        const resposta =
            await fetch(`${API_URL}/maquinas`);


        // Verificar se a API respondeu corretamente

        if (!resposta.ok) {

            throw new Error(
                `Erro HTTP: ${resposta.status}`
            );

        }


        // Converter resposta para JSON

        const maquinas =
            await resposta.json();


        // =================================================
        // TOTAL DE MÁQUINAS
        // =================================================

        if (totalMaquinas) {

            totalMaquinas.textContent =
                maquinas.length;

        }


        // =================================================
        // CONTADORES
        // =================================================

        let ativas = 0;
        let manutencao = 0;
        let paradas = 0;


        // =================================================
        // ANALISAR STATUS DAS MÁQUINAS
        // =================================================

        maquinas.forEach(function (maquina) {

            const status =
                String(
                    maquina.status ||
                    maquina.estado ||
                    ""
                )
                .trim()
                .toLowerCase();


            // ---------------------------------------------
            // FUNCIONANDO
            // ---------------------------------------------

            if (
                status === "ativo" ||
                status === "ativa" ||
                status === "funcionando"
            ) {

                ativas++;

            }


            // ---------------------------------------------
            // MANUTENÇÃO
            // ---------------------------------------------

            else if (
                status === "manutencao" ||
                status === "manutenção" ||
                status === "em manutencao" ||
                status === "em manutenção"
            ) {

                manutencao++;

            }


            // ---------------------------------------------
            // PARADA
            // ---------------------------------------------

            else if (
                status === "parada" ||
                status === "parado"
            ) {

                paradas++;

            }

        });


        // =================================================
        // MOSTRAR NO DASHBOARD
        // =================================================

        if (maquinasAtivas) {

            maquinasAtivas.textContent =
                ativas;

        }


        if (maquinasManutencao) {

            maquinasManutencao.textContent =
                manutencao;

        }


        if (maquinasParadas) {

            maquinasParadas.textContent =
                paradas;

        }


        console.log(
            "Máquinas carregadas:",
            maquinas
        );

        console.log(
            "Funcionando:",
            ativas
        );

        console.log(
            "Em manutenção:",
            manutencao
        );

        console.log(
            "Paradas:",
            paradas
        );


    } catch (erro) {

        console.error(
            "❌ Erro ao carregar máquinas:",
            erro
        );


        // Se o backend estiver desligado,
        // mostrar 0 para evitar números antigos.

        if (totalMaquinas) {
            totalMaquinas.textContent = "0";
        }

        if (maquinasAtivas) {
            maquinasAtivas.textContent = "0";
        }

        if (maquinasManutencao) {
            maquinasManutencao.textContent = "0";
        }

        if (maquinasParadas) {
            maquinasParadas.textContent = "0";
        }

    }

}


// =====================================================
// CARREGAR PRODUÇÃO
// =====================================================

function carregarProducao() {

    const producoesSalvas =
        localStorage.getItem("ecoFactoryProducoes");

    const producoes =
        producoesSalvas
            ? JSON.parse(producoesSalvas)
            : [];


    let total = 0;


    producoes.forEach(function (producao) {

        const quantidade =
            Number(
                producao.quantidade ||
                producao.quantidadeProducao ||
                0
            );


        if (!isNaN(quantidade)) {
            total += quantidade;
        }

    });


    if (totalProducao) {

        totalProducao.textContent =
            total.toLocaleString("pt-BR");

    }

}


// =====================================================
// SAIR
// =====================================================

if (logout) {

    logout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            localStorage.removeItem(
                "ecoFactoryLogado"
            );


            localStorage.removeItem(
                "ecoFactoryEmail"
            );


            window.location.href =
                "index.html";

        }
    );

}


// =====================================================
// ATUALIZAR DASHBOARD
// =====================================================

function atualizarDashboard() {

    carregarUsuario();

    carregarMaquinas();

    carregarProducao();

}


// =====================================================
// INICIAR
// =====================================================

atualizarDashboard();


// =====================================================
// ATUALIZAR QUANDO VOLTAR PARA A PÁGINA
// =====================================================

window.addEventListener(
    "focus",
    atualizarDashboard
);


window.addEventListener(
    "storage",
    atualizarDashboard
);