// =====================================================
// ECOFACTORY - LOGIN
// =====================================================


// =====================================================
// ELEMENTOS
// =====================================================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrarSenha");
const mensagem = document.getElementById("mensagem");
const googleButton = document.getElementById("googleButton");
const loginButton = document.getElementById("loginButton");
const lembrar = document.getElementById("lembrar");


// =====================================================
// VERIFICAR SE JÁ ESTÁ LOGADO
// =====================================================

if (localStorage.getItem("ecoFactoryLogado") === "true") {

    window.location.href = "dashboard.html";

}


// =====================================================
// MOSTRAR / ESCONDER SENHA
// =====================================================

if (mostrarSenha) {

    mostrarSenha.addEventListener("click", function () {

        if (senhaInput.type === "password") {

            senhaInput.type = "text";

            mostrarSenha.textContent = "🙈";

        } else {

            senhaInput.type = "password";

            mostrarSenha.textContent = "👁";

        }

    });

}


// =====================================================
// LOGIN NORMAL
// =====================================================

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            emailInput.value.trim();

        const senha =
            senhaInput.value.trim();


        // =================================================
        // LIMPAR MENSAGEM
        // =================================================

        mensagem.textContent = "";

        mensagem.className = "mensagem";


        // =================================================
        // VERIFICAR CAMPOS
        // =================================================

        if (email === "" || senha === "") {

            mensagem.textContent =
                "Preencha o e-mail e a senha.";

            mensagem.classList.add("erro");

            return;

        }


        // =================================================
        // BUSCAR USUÁRIO CADASTRADO
        // =================================================

        let usuarioCadastrado = null;

        const usuarioSalvo =
            localStorage.getItem("ecoFactoryUsuario");


        if (usuarioSalvo) {

            try {

                usuarioCadastrado =
                    JSON.parse(usuarioSalvo);

            } catch (erro) {

                console.error(
                    "Erro ao ler usuário:",
                    erro
                );

            }

        }


        // =================================================
        // VERIFICAR LOGIN
        // =================================================

        if (usuarioCadastrado) {

            if (
                email !== usuarioCadastrado.email ||
                senha !== usuarioCadastrado.senha
            ) {

                mensagem.textContent =
                    "E-mail ou senha incorretos.";

                mensagem.classList.add("erro");

                return;

            }

        }


        // =================================================
        // PEGAR NOME DO USUÁRIO
        // =================================================

        let nomeUsuario = "Usuário";


        if (
            usuarioCadastrado &&
            usuarioCadastrado.nome
        ) {

            nomeUsuario =
                usuarioCadastrado.nome;

        } else {

            // Se não existir nome,
            // usa a parte antes do @

            nomeUsuario =
                email
                    .split("@")[0];

        }


        // =================================================
        // SALVAR NOME
        // =================================================

        localStorage.setItem(
            "ecoFactoryNome",
            nomeUsuario
        );


        // =================================================
        // SALVAR USUÁRIO
        // =================================================

        if (usuarioCadastrado) {

            localStorage.setItem(
                "ecoFactoryUsuario",
                JSON.stringify({
                    ...usuarioCadastrado,
                    nome: nomeUsuario
                })
            );

        }


        // =================================================
        // LOGIN APROVADO
        // =================================================

        localStorage.setItem(
            "ecoFactoryLogado",
            "true"
        );


        localStorage.setItem(
            "ecoFactoryEmail",
            email
        );


        // =================================================
        // LEMBRAR-ME
        // =================================================

        if (
            lembrar &&
            lembrar.checked
        ) {

            localStorage.setItem(
                "ecoFactoryLembrar",
                "true"
            );

        } else {

            localStorage.removeItem(
                "ecoFactoryLembrar"
            );

        }


        // =================================================
        // MENSAGEM
        // =================================================

        mensagem.textContent =
            "Login realizado com sucesso!";

        mensagem.classList.add("sucesso");


        // =================================================
        // IR PARA DASHBOARD
        // =================================================

        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 700);

    });

}


// =====================================================
// LOGIN COM GOOGLE - TESTE
// =====================================================

if (googleButton) {

    googleButton.addEventListener(
        "click",
        function () {

            mensagem.textContent = "";

            mensagem.className =
                "mensagem";


            // Desativar botão

            googleButton.disabled = true;


            googleButton.innerHTML =
                '<span class="google-icon">G</span> Conectando...';


            // =================================================
            // USUÁRIO GOOGLE DE TESTE
            // =================================================

            setTimeout(function () {

                const usuarioGoogle = {

                    nome: "Usuário Google",

                    email: "google@ecofactory.com",

                    tipo: "google"

                };


                // =================================================
                // SALVAR USUÁRIO GOOGLE
                // =================================================

                localStorage.setItem(
                    "ecoFactoryUsuarioGoogle",
                    JSON.stringify(usuarioGoogle)
                );


                // =================================================
                // SALVAR NOME
                // =================================================

                localStorage.setItem(
                    "ecoFactoryNome",
                    usuarioGoogle.nome
                );


                // =================================================
                // SALVAR USUÁRIO PRINCIPAL
                // =================================================

                localStorage.setItem(
                    "ecoFactoryUsuario",
                    JSON.stringify(usuarioGoogle)
                );


                // =================================================
                // MARCAR LOGIN
                // =================================================

                localStorage.setItem(
                    "ecoFactoryLogado",
                    "true"
                );


                // =================================================
                // SALVAR EMAIL
                // =================================================

                localStorage.setItem(
                    "ecoFactoryEmail",
                    usuarioGoogle.email
                );


                // =================================================
                // MENSAGEM
                // =================================================

                mensagem.textContent =
                    "Login com Google realizado com sucesso!";

                mensagem.classList.add(
                    "sucesso"
                );


                // =================================================
                // IR PARA DASHBOARD
                // =================================================

                setTimeout(function () {

                    window.location.href =
                        "dashboard.html";

                }, 700);


            }, 800);

        }
    );

}


// =====================================================
// ENTER NOS CAMPOS
// =====================================================

if (
    emailInput &&
    senhaInput
) {

    emailInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                senhaInput.focus();

            }

        }
    );

}


// =====================================================
// LIMPAR MENSAGEM AO DIGITAR EMAIL
// =====================================================

if (emailInput) {

    emailInput.addEventListener(
        "input",
        function () {

            mensagem.textContent = "";

            mensagem.className =
                "mensagem";

        }
    );

}


// =====================================================
// LIMPAR MENSAGEM AO DIGITAR SENHA
// =====================================================

if (senhaInput) {

    senhaInput.addEventListener(
        "input",
        function () {

            mensagem.textContent = "";

            mensagem.className =
                "mensagem";

        }
    );

}