// static/js/auth.js  (ES module)

async function api(url, payload = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();  // servidor sempre responde JSON
}

/* ---------- LOGIN ---------- */
export function attachLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await api("/auth/login", {
      email: form.email.value,
      senha: form.senha.value
    });
    if (data.success) window.location.href = "/dashboard";
    else alert(data.error || "Falha no login");
  });
}

/* ---------- REGISTRO ---------- */
export function attachRegister() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.senha.value !== form.confirmar_senha.value) {
      alert("Senhas não coincidem"); return;
    }
    const data = await api("/auth/register", {
      nome:  form.nome.value,
      email: form.email.value,
      senha: form.senha.value,
      confirmar_senha: form.confirmar_senha.value
    });
    if (data.success) window.location.href = "/dashboard";
    else alert(data.error || "Falha no cadastro");
  });
}

/* ---------- LOGOUT ---------- */
export function attachLogout() {
  const link = document.getElementById("logoutLink");  // <a id="logoutLink">
  if (!link) return;

  link.addEventListener("click", async (e) => {
    e.preventDefault();
    await api("/auth/logout");          // POST vazio
    window.location.href = "/";
  });
}
