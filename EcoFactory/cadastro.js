const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validação
  if(password !== confirmPassword){
    errorMsg.textContent = "As senhas não coincidem!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Verifica se já existe
  if(users.some(user => user.email === email)){
    errorMsg.textContent = "Email já cadastrado!";
    return;
  }

  // Salva usuário
  const newUser = { name, email, password };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  // 🔥 LOGIN AUTOMÁTICO após cadastro
  localStorage.setItem("loggedUser", JSON.stringify(newUser));

  alert("Conta criada com sucesso!");

  // Vai direto pro dashboard
  window.location.href = "dashboard.html";
});