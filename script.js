// =====================================================
// ECOFACTORY - LOGIN
// =====================================================


// =====================================================
// API
// =====================================================

const API_URL =
    "http://127.0.0.1:3000";


// =====================================================
// ELEMENTOS
// =====================================================

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const senhaInput =
    document.getElementById("senha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mensagem =
    document.getElementById("mensagem");

const googleButton =
    document.getElementById("googleButton");

const loginButton =
    document.getElementById("loginButton");

const lembrar =
    document.getElementById("lembrar");


// =====================================================
// VERIFICAR SE JÁ ESTÁ LOGADO
// =====================================================

if (
    localStorage.getItem(
        "ecoFactoryLogado"
    ) === "true"
) {

    window.location.href =
        "dashboard.html";

}


// =====================================================
// MOSTRAR / ESCONDER SENHA
// =====================================================

if (mostrarSenha) {

    mostrarSenha.addEventListener(
        "click",
        function () {

            if (
                senhaInput.type ===
                "password"
            ) {

                senhaInput.type =
                    "text";

                mostrarSenha.textContent =
                    "🙈";

            } else {

                senhaInput.type =
                    "password";

                mostrarSenha.textContent =
                    "👁";

            }

        }
    );

}


// =====================================================
// LOGIN NORMAL
// =====================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // =================================================
            // PEGAR DADOS
            // =================================================

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const senha =
                senhaInput.value;


            // =================================================
            // LIMPAR MENSAGEM
            // =================================================

            mensagem.textContent =
                "";

            mensagem.className =
                "mensagem";


            // =================================================
            // VALIDAR CAMPOS
            // =================================================

            if (
                email === "" ||
                senha === ""
            ) {

                mensagem.textContent =
                    "Preencha o e-mail e a senha.";

                mensagem.classList.add(
                    "erro"
                );

                return;

            }


            // =================================================
            // DESABILITAR BOTÃO
            // =================================================

            if (loginButton) {

                loginButton.disabled =
                    true;

                loginButton.textContent =
                    "Entrando...";

            }


            // =================================================
            // ENVIAR LOGIN PARA O BACKEND
            // =================================================

            try {

                const resposta =
                    await fetch(
                        `${API_URL}/login`,
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    email:
                                        email,

                                    senha:
                                        senha

                                })

                        }
                    );


                const dados =
                    await resposta.json();


                // =================================================
                // LOGIN NEGADO
                // =================================================

                if (
                    !resposta.ok
                ) {

                    mensagem.textContent =
                        dados.erro ||
                        "E-mail ou senha incorretos.";

                    mensagem.classList.add(
                        "erro"
                    );


                    if (loginButton) {

                        loginButton.disabled =
                            false;

                        loginButton.textContent =
                            "Entrar";

                    }

                    return;

                }


                // =================================================
                // USUÁRIO RETORNADO
                // =================================================

                const usuario =
                    dados.usuario;


                const nomeUsuario =
                    usuario.nome ||
                    email.split("@")[0];


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
                // A senha NÃO é salva.

                const usuarioLocal = {

                    id:
                        usuario.id,

                    nome:
                        nomeUsuario,

                    email:
                        usuario.email

                };


                localStorage.setItem(
                    "ecoFactoryUsuario",
                    JSON.stringify(
                        usuarioLocal
                    )
                );


                // =================================================
                // COMPATIBILIDADE COM PERFIL
                // =================================================

                localStorage.setItem(
                    "usuarioEcoFactory",
                    JSON.stringify(
                        usuarioLocal
                    )
                );


                // =================================================
                // MARCAR LOGIN
                // =================================================

                localStorage.setItem(
                    "ecoFactoryLogado",
                    "true"
                );


                // =================================================
                // SALVAR E-MAIL
                // =================================================

                localStorage.setItem(
                    "ecoFactoryEmail",
                    usuario.email
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
                // SUCESSO
                // =================================================

                mensagem.textContent =
                    "Login realizado com sucesso!";

                mensagem.classList.add(
                    "sucesso"
                );


                // =================================================
                // DASHBOARD
                // =================================================

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    700
                );


            } catch (erro) {

                console.error(
                    "❌ Erro ao realizar login:",
                    erro
                );


                mensagem.textContent =
                    "Não foi possível conectar ao servidor.";

                mensagem.classList.add(
                    "erro"
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Entrar";

                }

            }

        }
    );

}


// =====================================================
// LOGIN COM GOOGLE - TESTE
// =====================================================

if (googleButton) {

    googleButton.addEventListener(
        "click",
        async function () {

            mensagem.textContent =
                "";

            mensagem.className =
                "mensagem";


            // =================================================
            // DESABILITAR BOTÃO
            // =================================================

            googleButton.disabled =
                true;

            googleButton.innerHTML =
                '<span class="google-icon">G</span> Conectando...';


            try {

                // =================================================
                // ENVIAR PARA O BACKEND
                // =================================================

                const resposta =
                    await fetch(
                        `${API_URL}/usuarios/google`,
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    nome:
                                        "Usuário Google",

                                    email:
                                        "google@ecofactory.com"

                                })

                        }
                    );


                const dados =
                    await resposta.json();


                if (
                    !resposta.ok
                ) {

                    throw new Error(
                        dados.erro ||
                        "Erro no login Google."
                    );

                }


                // =================================================
                // USUÁRIO
                // =================================================

                const usuario =
                    dados.usuario;


                // =================================================
                // DADOS LOCAIS
                // =================================================

                const usuarioLocal = {

                    id:
                        usuario.id,

                    nome:
                        usuario.nome,

                    email:
                        usuario.email

                };


                // =================================================
                // SALVAR NOME
                // =================================================

                localStorage.setItem(
                    "ecoFactoryNome",
                    usuario.nome
                );


                // =================================================
                // SALVAR USUÁRIO
                // =================================================

                localStorage.setItem(
                    "ecoFactoryUsuario",
                    JSON.stringify(
                        usuarioLocal
                    )
                );


                // =================================================
                // COMPATIBILIDADE COM PERFIL
                // =================================================

                localStorage.setItem(
                    "usuarioEcoFactory",
                    JSON.stringify(
                        usuarioLocal
                    )
                );


                // =================================================
                // MARCAR LOGIN
                // =================================================

                localStorage.setItem(
                    "ecoFactoryLogado",
                    "true"
                );


                // =================================================
                // SALVAR E-MAIL
                // =================================================

                localStorage.setItem(
                    "ecoFactoryEmail",
                    usuario.email
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
                // DASHBOARD
                // =================================================

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    700
                );


            } catch (erro) {

                console.error(
                    "❌ Erro no Google:",
                    erro
                );


                mensagem.textContent =
                    "Não foi possível realizar o login com Google.";

                mensagem.classList.add(
                    "erro"
                );


                googleButton.disabled =
                    false;

                googleButton.innerHTML =
                    '<span class="google-icon">G</span> Continuar com Google';

            }

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

            if (
                event.key === "Enter"
            ) {

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

            mensagem.textContent =
                "";

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

            mensagem.textContent =
                "";

            mensagem.className =
                "mensagem";

        }
    );

}