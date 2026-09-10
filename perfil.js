// =====================================================
// ECOFACTORY - PERFIL
// =====================================================


// =====================================================
// VERIFICAR LOGIN
// =====================================================

if (localStorage.getItem("ecoFactoryLogado") !== "true") {

    window.location.href = "index.html";

}


// =====================================================
// ELEMENTOS
// =====================================================

const topUserName =
    document.getElementById("topUserName");

const topUserAvatar =
    document.getElementById("topUserAvatar");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profileAvatar =
    document.getElementById("profileAvatar");

const infoNome =
    document.getElementById("infoNome");

const infoEmail =
    document.getElementById("infoEmail");

const infoTipo =
    document.getElementById("infoTipo");

const logout =
    document.getElementById("logout");

const logoutButton =
    document.getElementById("logoutButton");


// =====================================================
// PEGAR USUÁRIO SALVO
// =====================================================

const usuarioSalvo =
    localStorage.getItem("ecoFactoryUsuario");


// =====================================================
// VERIFICAR USUÁRIO
// =====================================================

if (!usuarioSalvo) {

    localStorage.removeItem("ecoFactoryLogado");

    window.location.href = "index.html";

}


// =====================================================
// CONVERTER USUÁRIO
// =====================================================

let usuario;

try {

    usuario = JSON.parse(usuarioSalvo);

} catch (erro) {

    console.error(
        "Erro ao carregar usuário:",
        erro
    );

    localStorage.removeItem(
        "ecoFactoryUsuario"
    );

    localStorage.removeItem(
        "ecoFactoryLogado"
    );

    window.location.href = "index.html";

}


// =====================================================
// VERIFICAR DADOS DO USUÁRIO
// =====================================================

if (
    !usuario ||
    typeof usuario !== "object"
) {

    localStorage.removeItem(
        "ecoFactoryUsuario"
    );

    localStorage.removeItem(
        "ecoFactoryLogado"
    );

    window.location.href = "index.html";

}


// =====================================================
// PEGAR NOME E E-MAIL
// =====================================================

const nome =
    String(
        usuario.nome || "Usuário"
    ).trim();

const email =
    String(
        usuario.email || "E-mail não informado"
    ).trim();


// =====================================================
// PRIMEIRA LETRA
// =====================================================

const primeiraLetra =
    nome.charAt(0).toUpperCase() || "U";


// =====================================================
// PREENCHER NOME NO TOPO
// =====================================================

if (topUserName) {

    topUserName.textContent = nome;

}


// =====================================================
// PREENCHER AVATAR DO TOPO
// =====================================================

if (topUserAvatar) {

    topUserAvatar.textContent =
        primeiraLetra;

}


// =====================================================
// PREENCHER NOME DO PERFIL
// =====================================================

if (profileName) {

    profileName.textContent =
        nome;

}


// =====================================================
// PREENCHER E-MAIL DO PERFIL
// =====================================================

if (profileEmail) {

    profileEmail.textContent =
        email;

}


// =====================================================
// PREENCHER AVATAR DO PERFIL
// =====================================================

if (profileAvatar) {

    profileAvatar.textContent =
        primeiraLetra;

}


// =====================================================
// PREENCHER INFORMAÇÃO - NOME
// =====================================================

if (infoNome) {

    infoNome.textContent =
        nome;

}


// =====================================================
// PREENCHER INFORMAÇÃO - E-MAIL
// =====================================================

if (infoEmail) {

    infoEmail.textContent =
        email;

}


// =====================================================
// TIPO DE CONTA
// =====================================================

if (infoTipo) {

    if (
        usuario.tipo === "google"
    ) {

        infoTipo.textContent =
            "Conta Google";

    } else {

        infoTipo.textContent =
            "Usuário do sistema";

    }

}


// =====================================================
// FUNÇÃO SAIR DA CONTA
// =====================================================

function sairDaConta() {

    // Remove somente a sessão atual

    localStorage.removeItem(
        "ecoFactoryLogado"
    );

    localStorage.removeItem(
        "ecoFactoryEmail"
    );

    // NÃO remove:
    // ecoFactoryUsuario

    // Assim o usuário continua cadastrado
    // e pode entrar novamente.

    window.location.href =
        "index.html";

}


// =====================================================
// BOTÃO SAIR - SIDEBAR
// =====================================================

if (logout) {

    logout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sairDaConta();

        }
    );

}


// =====================================================
// BOTÃO SAIR - PERFIL
// =====================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sairDaConta();

        }
    );

}