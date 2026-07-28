import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@200;400;600;700;800&family=Rajdhani:wght@400;500;600&display=swap');

:root {
  --black: #020408;
  --dark: #050d18;
  --cyan: #00d4ff;
  --cyan-dim: rgba(0,212,255,0.1);
  --cyan-glow: rgba(0,212,255,0.4);
  --emerald: #00e887;
  --emerald-dim: rgba(0,232,135,0.1);
  --text: #c8ddf0;
  --text-dim: #5a7a9a;
  --text-muted: #2a4a6a;
  --border: rgba(0,212,255,0.12);
  --border-bright: rgba(0,212,255,0.35);
  --mono: 'Share Tech Mono', monospace;
  --head: 'Exo 2', sans-serif;
  --body: 'Rajdhani', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.sal-login-page {
  min-height: 100vh;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  font-family: var(--body);
  position: relative;
  overflow: hidden;
}

.sal-login-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.sal-login-card {
  background: rgba(7,18,32,0.97);
  border: 1px solid rgba(0,212,255,0.2);
  width: 100%;
  max-width: 420px;
  padding: 44px 40px;
  position: relative;
  z-index: 1;
  clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
}

.sal-login-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyan), var(--emerald), transparent);
}

.sal-card-corner {
  position: absolute;
  width: 10px; height: 10px;
  border-color: var(--cyan);
  border-style: solid;
  opacity: 0.5;
}
.sal-corner-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
.sal-corner-tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
.sal-corner-bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
.sal-corner-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

.sal-card-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.sal-card-hex {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, var(--cyan), var(--emerald));
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; flex-shrink: 0;
}

.sal-card-brand {
  font-family: var(--head);
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.05em;
}

.sal-card-badge {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--cyan);
  background: var(--cyan-dim);
  border: 1px solid rgba(0,212,255,0.3);
  padding: 2px 7px;
  border-radius: 3px;
  letter-spacing: 0.1em;
}

.sal-card-title {
  font-family: var(--head);
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  margin: 20px 0 4px;
  letter-spacing: -0.01em;
}

.sal-card-subtitle {
  font-family: var(--mono);
  font-size: 0.68rem;
  color: var(--emerald);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.sal-card-subtitle::before {
  content: '';
  width: 20px; height: 1px;
  background: var(--emerald);
}

.sal-field-group {
  margin-bottom: 16px;
  position: relative;
}

.sal-field-label {
  font-family: var(--mono);
  font-size: 0.63rem;
  color: var(--text-dim);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
}

.sal-field {
  width: 100%;
  background: rgba(5,13,24,0.85);
  border: 1px solid rgba(0,212,255,0.14);
  color: var(--text);
  font-family: var(--body);
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 40px 12px 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  box-sizing: border-box;
}
.sal-field:focus {
  border-color: rgba(0,212,255,0.5);
  box-shadow: 0 0 0 1px rgba(0,212,255,0.12);
}
.sal-field::placeholder { color: var(--text-muted); }

.sal-field-ico {
  position: absolute;
  right: 14px; bottom: 13px;
  color: var(--text-muted);
  font-size: 15px;
  pointer-events: none;
}

.sal-btn-submit {
  width: 100%;
  background: linear-gradient(135deg, var(--cyan), #0099bb);
  color: var(--black);
  font-family: var(--head);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  padding: 14px;
  cursor: pointer;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  transition: all 0.3s;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.sal-btn-submit:hover {
  box-shadow: 0 0 28px var(--cyan-glow);
  transform: translateY(-1px);
}
.sal-btn-submit:active { transform: translateY(0); }
.sal-btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.sal-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 16px;
}
.sal-divider-line {
  flex: 1; height: 1px;
  background: rgba(0,212,255,0.08);
}
.sal-divider-tag {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.sal-link-row {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-dim);
}
.sal-link-row a {
  color: var(--emerald);
  text-decoration: none;
  font-weight: 600;
  margin-left: 6px;
  transition: color 0.2s;
}
.sal-link-row a:hover { color: var(--cyan); }

.sal-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(0,212,255,0.08);
  flex-wrap: wrap;
  gap: 8px;
}
.sal-status-item {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}
.sal-status-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--emerald);
  animation: blinkDot 2s step-end infinite;
}
@keyframes blinkDot { 50% { opacity: 0; } }

.sal-error-msg {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: #ff4466;
  background: rgba(255,68,102,0.08);
  border: 1px solid rgba(255,68,102,0.2);
  padding: 10px 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sal-success-msg {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--emerald);
  background: var(--emerald-dim);
  border: 1px solid rgba(0,232,135,0.2);
  padding: 10px 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 480px) {
  .sal-login-card { padding: 36px 24px; }
  .sal-card-title { font-size: 1.5rem; }
}
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (document.getElementById("sal-login-css")) return;
    const style = document.createElement("style");
    style.id = "sal-login-css";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("// Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("// Acceso autorizado — redirigiendo...");
      } else {
        setError(`// ${data.message || "Credenciales inválidas"}`);
      }
    } catch (err) {
      setError("// Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="sal-login-page">
      <div className="sal-login-grid" />

      <div className="sal-login-card">
        <div className="sal-card-corner sal-corner-tl" />
        <div className="sal-card-corner sal-corner-tr" />
        <div className="sal-card-corner sal-corner-bl" />
        <div className="sal-card-corner sal-corner-br" />

        {/* Logo */}
        <div className="sal-card-logo">
          <div className="sal-card-hex">🔐</div>
          <span className="sal-card-brand">SecureAuth Lab</span>
          <span className="sal-card-badge">v2.1</span>
        </div>

        <h1 className="sal-card-title">Iniciar sesión</h1>
        <p className="sal-card-subtitle">Acceso al sistema</p>

        {/* Mensajes */}
        {error && (
          <div className="sal-error-msg">
            <span>⚠</span> {error}
          </div>
        )}
        {success && (
          <div className="sal-success-msg">
            <span>✓</span> {success}
          </div>
        )}

        {/* Email */}
        <div className="sal-field-group">
          <label className="sal-field-label">Correo electrónico</label>
          <input
            className="sal-field"
            type="email"
            placeholder="usuario@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="sal-field-ico">✉</span>
        </div>

        {/* Password */}
        <div className="sal-field-group">
          <label className="sal-field-label">Contraseña</label>
          <input
            className="sal-field"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="sal-field-ico">🔒</span>
        </div>

        {/* Botón */}
        <button
          className="sal-btn-submit"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <span>⟳</span> Verificando...
            </>
          ) : (
            <>
              <span>▶</span> Iniciar sesión
            </>
          )}
        </button>

        <div className="sal-divider">
          <div className="sal-divider-line" />
          <span className="sal-divider-tag">// AUTH</span>
          <div className="sal-divider-line" />
        </div>

        <p className="sal-link-row">
          ¿No tienes cuenta?
          <Link to="/register">Registrarse →</Link>
        </p>

        <div className="sal-status-bar">
          <span className="sal-status-item">
            <span className="sal-status-dot" /> Sistema operativo
          </span>
          <span className="sal-status-item">POST /api/auth/login</span>
          <span className="sal-status-item">JWT · bcrypt</span>
        </div>
      </div>
    </div>
  );
}