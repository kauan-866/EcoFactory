// 🔒 Verificar se está logado
const user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
  window.location.href = "index.html";
}

// 👤 Mostrar dados do usuário
document.getElementById("userName").textContent = user.name;
document.getElementById("userEmail").textContent = user.email;

// Mensagem personalizada
document.getElementById("welcomeMsg").textContent =
  `Olá ${user.name}, bem-vindo ao EcoFactory! 🚀`;

// 📊 Dados simulados (pode trocar por API depois)
document.getElementById("prod").textContent = "1.250 unidades";
document.getElementById("eff").textContent = "87%";
document.getElementById("cons").textContent = "320 kWh";
document.getElementById("emi").textContent = "42 kg CO₂";

// 🚪 Logout
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
}