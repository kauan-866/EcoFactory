const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// 🔥 Se já estiver logado, vai direto pro dashboard
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if(loggedUser){
  window.location.href = "dashboard.html";
}

form.addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    user => user.email === email && user.password === password
  );

  if(user){
    // Salva sessão
    localStorage.setItem("loggedUser", JSON.stringify(user));

    // Vai pro dashboard
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Email ou senha inválidos!";
  }
});