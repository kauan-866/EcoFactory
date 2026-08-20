// =====================================================
// ECOFACTORY - CADASTRO
// =====================================================


// =====================================================
// ELEMENTOS
// =====================================================

const cadastroForm =
    document.getElementById("cadastroForm");

const senha =
    document.getElementById("senha");

const confirmarSenha =
    document.getElementById("confirmarSenha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mostrarConfirmacao =
    document.getElementById("mostrarConfirmacao");

const mensagem =
    document.getElementById("mensagem");


// =====================================================
// MOSTRAR / ESCONDER SENHA
// =====================================================

if (mostrarSenha) {

    mostrarSenha.addEventListener(
        "click",
        function () {

            if (senha.type === "password") {

                senha.type = "text";

                mostrarSenha.textContent = "🙈";

            } else {

                senha.type = "password";

                mostrarSenha.textContent = "👁";

            }

        }
    );

}


// =====================================================
// MOSTRAR / ESCONDER CONFIRMAÇÃO
// =====================================================

if (mostrarConfirmacao) {

    mostrarConfirmacao.addEventListener(
        "click",
        function () {

            if (
                confirmarSenha.type ===
                "password"
            ) {

                confirmarSenha.type = "text";

                mostrarConfirmacao.textContent =
                    "🙈";

            } else {

                confirmarSenha.type = "password";

                mostrarConfirmacao.textContent =
                    "👁";

            }

        }
    );

}


// =====================================================
// CADASTRO
// =====================================================

if (cadastroForm) {

    cadastroForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // =================================================
            // PEGAR DADOS
            // =================================================

            const nomeInput =
                document.getElementById("nome");

            const emailInput =
                document.getElementById("email");

            const termosInput =
                document.getElementById("termos");


            const nome =
                nomeInput.value.trim();

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const termos =
                termosInput.checked;


            // =================================================
            // LIMPAR MENSAGEM
            // =================================================

            mensagem.textContent = "";

            mensagem.style.color = "";


            // =================================================
            // VALIDAR NOME
            // =================================================

            if (nome === "") {

                mensagem.textContent =
                    "Digite seu nome.";

                mensagem.style.color =
                    "#d93025";

                nomeInput.focus();

                return;

            }


            // =================================================
            // VALIDAR E-MAIL
            // =================================================

            if (email === "") {

                mensagem.textContent =
                    "Digite seu e-mail.";

                mensagem.style.color =
                    "#d93025";

                emailInput.focus();

                return;

            }


            // =================================================
            // VALIDAR SENHA
            // =================================================

            if (senha.value.length < 6) {

                mensagem.textContent =
                    "A senha deve ter pelo menos 6 caracteres.";

                mensagem.style.color =
                    "#d93025";

                senha.focus();

                return;

            }


            // =================================================
            // CONFIRMAR SENHA
            // =================================================

            if (
                senha.value !==
                confirmarSenha.value
            ) {

                mensagem.textContent =
                    "As senhas não são iguais.";

                mensagem.style.color =
                    "#d93025";

                confirmarSenha.focus();

                return;

            }


            // =================================================
            // TERMOS
            // =================================================

            if (!termos) {

                mensagem.textContent =
                    "Aceite os termos para continuar.";

                mensagem.style.color =
                    "#d93025";

                return;

            }


            // =================================================
            // VERIFICAR USUÁRIO EXISTENTE
            // =================================================

            const usuarioSalvo =
                localStorage.getItem(
                    "ecoFactoryUsuario"
                );


            let usuarioExistente = null;


            if (usuarioSalvo) {

                try {

                    usuarioExistente =
                        JSON.parse(
                            usuarioSalvo
                        );

                } catch (erro) {

                    usuarioExistente = null;

                }

            }


            if (
                usuarioExistente &&
                usuarioExistente.email === email
            ) {

                mensagem.textContent =
                    "Este e-mail já está cadastrado.";

                mensagem.style.color =
                    "#d93025";

                return;

            }


            // =================================================
            // CRIAR USUÁRIO
            // =================================================

            const usuario = {

                nome: nome,

                email: email,

                senha: senha.value,

                tipo: "normal"

            };


            // =================================================
            // SALVAR USUÁRIO PRINCIPAL
            // =================================================

            localStorage.setItem(
                "ecoFactoryUsuario",
                JSON.stringify(usuario)
            );


            // =================================================
            // SALVAR NOME
            // =================================================

            localStorage.setItem(
                "ecoFactoryNome",
                nome
            );


            // =================================================
            // COMPATIBILIDADE COM PERFIL ANTIGO
            // =================================================

            localStorage.setItem(
                "usuarioEcoFactory",
                JSON.stringify(usuario)
            );


            // =================================================
            // LIMPAR LOGIN ANTERIOR
            // =================================================

            localStorage.removeItem(
                "ecoFactoryLogado"
            );

            localStorage.removeItem(
                "ecoFactoryEmail"
            );


            // =================================================
            // MENSAGEM
            // =================================================

            mensagem.textContent =
                "Conta criada com sucesso!";

            mensagem.style.color =
                "#168a3c";


            // =================================================
            // DESABILITAR BOTÃO
            // =================================================

            const botao =
                cadastroForm.querySelector(
                    'button[type="submit"]'
                );


            if (botao) {

                botao.disabled = true;

                botao.textContent =
                    "Conta criada...";

            }


            // =================================================
            // IR PARA LOGIN
            // =================================================

            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1000);

        }
    );

}