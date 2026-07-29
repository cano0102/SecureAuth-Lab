import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://secureauth-lab.onrender.com";

const REGISTER_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@200;400;600;700;800&family=Rajdhani:wght@400;500;600&display=swap');

.sal-reg-page {
  min-height: 100vh;
  background: #020408;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  font-family: 'Rajdhani', sans-serif;
  position: relative;
  overflow: hidden;
}

.sal-reg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,232,135,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,232,135,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.sal-reg-card {
  background: rgba(7,18,32,0.97);
  border: 1px solid rgba(0,232,135,0.18);
  width: 100%;
  max-width: 420px;
  padding: 44px 40px;
  position: relative;
  z-index: 1;
  clip-path: polygon(
    16px 0%,
    100% 0%,
    calc(100% - 16px) 100%,
    0% 100%
  );
}

.sal-reg-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    #00e887,
    #00d4ff,
    transparent
  );
}

.sal-reg-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: #00e887;
  border-style: solid;
  opacity: 0.4;
}

.sal-rc-tl {
  top: 8px;
  left: 8px;
  border-width: 1px 0 0 1px;
}

.sal-rc-tr {
  top: 8px;
  right: 8px;
  border-width: 1px 1px 0 0;
}

.sal-rc-bl {
  bottom: 8px;
  left: 8px;
  border-width: 0 0 1px 1px;
}

.sal-rc-br {
  bottom: 8px;
  right: 8px;
  border-width: 0 1px 1px 0;
}

.sal-reg-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.sal-reg-hex {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00e887, #00d4ff);
  clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

.sal-reg-brand {
  font-family: 'Exo 2', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.05em;
}

.sal-reg-badge {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #00e887;
  background: rgba(0,232,135,0.1);
  border: 1px solid rgba(0,232,135,0.3);
  padding: 2px 7px;
  border-radius: 3px;
  letter-spacing: 0.1em;
}

.sal-reg-title {
  font-family: 'Exo 2', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  margin: 20px 0 4px;
  letter-spacing: -0.01em;
}

.sal-reg-subtitle {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  color: #00d4ff;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sal-reg-subtitle::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #00d4ff;
}

.sal-reg-field-group {
  margin-bottom: 16px;
  position: relative;
}

.sal-reg-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.63rem;
  color: #5a7a9a;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
}

.sal-reg-field {
  width: 100%;
  background: rgba(5,13,24,0.85);
  border: 1px solid rgba(0,232,135,0.12);
  color: #c8ddf0;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 40px 12px 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  clip-path: polygon(
    8px 0%,
    100% 0%,
    calc(100% - 8px) 100%,
    0% 100%
  );
  box-sizing: border-box;
}

.sal-reg-field:focus {
  border-color: rgba(0,232,135,0.45);
  box-shadow: 0 0 0 1px rgba(0,232,135,0.1);
}

.sal-reg-field::placeholder {
  color: #2a4a6a;
}

.sal-reg-field-ico {
  position: absolute;
  right: 14px;
  bottom: 13px;
  color: #2a4a6a;
  font-size: 15px;
  pointer-events: none;
}

.sal-reg-hints {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.sal-reg-hint {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #2a4a6a;
  background: rgba(0,232,135,0.05);
  border: 1px solid rgba(0,232,135,0.1);
  padding: 4px 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.sal-reg-btn {
  width: 100%;
  background: linear-gradient(135deg, #00e887, #00aa55);
  color: #020408;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  padding: 14px;
  cursor: pointer;
  clip-path: polygon(
    10px 0%,
    100% 0%,
    calc(100% - 10px) 100%,
    0% 100%
  );
  transition: all 0.3s;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.sal-reg-btn:hover {
  box-shadow: 0 0 28px rgba(0,232,135,0.35);
  transform: translateY(-1px);
}

.sal-reg-btn:active {
  transform: translateY(0);
}

.sal-reg-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.sal-reg-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 16px;
}

.sal-reg-div-line {
  flex: 1;
  height: 1px;
  background: rgba(0,232,135,0.08);
}

.sal-reg-div-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #2a4a6a;
  letter-spacing: 0.1em;
}

.sal-reg-link-row {
  text-align: center;
  font-size: 0.9rem;
  color: #5a7a9a;
}

.sal-reg-link-row a {
  color: #00d4ff;
  text-decoration: none;
  font-weight: 600;
  margin-left: 6px;
  transition: color 0.2s;
}

.sal-reg-link-row a:hover {
  color: #00e887;
}

.sal-reg-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(0,232,135,0.07);
  flex-wrap: wrap;
  gap: 8px;
}

.sal-reg-stat {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #2a4a6a;
  display: flex;
  align-items: center;
  gap: 5px;
}

.sal-reg-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #00e887;
  animation: blinkReg 2s step-end infinite;
}

@keyframes blinkReg {
  50% {
    opacity: 0;
  }
}

.sal-reg-error {
  font-family: 'Share Tech Mono', monospace;
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

.sal-reg-success {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: #00e887;
  background: rgba(0,232,135,0.08);
  border: 1px solid rgba(0,232,135,0.2);
  padding: 10px 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 480px) {
  .sal-reg-card {
    padding: 36px 24px;
  }

  .sal-reg-title {
    font-size: 1.5rem;
  }
}
`;

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (document.getElementById("sal-register-css")) return;

    const style = document.createElement("style");
    style.id = "sal-register-css";
    style.textContent = REGISTER_CSS;

    document.head.appendChild(style);
  }, []);

  const handleRegister = async (e) => {
    e?.preventDefault();

    setError("");
    setSuccess("");

    // Validaciones
    if (!nombre.trim() || !email.trim() || !password) {
      setError("// Completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("// La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      // Intentar obtener la respuesta como JSON
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Error al registrar usuario"
        );
      }

      // Registro exitoso
      setSuccess(
        "// Usuario registrado — puedes iniciar sesión"
      );

      setNombre("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("Error en registro:", err);

      if (err.message === "Failed to fetch") {
        setError(
          "// No se pudo conectar con el servidor"
        );
      } else {
        setError(
          `// ${err.message || "Error al registrar usuario"}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleRegister(e);
    }
  };

  return (
    <div className="sal-reg-page">
      <div className="sal-reg-grid" />

      <div className="sal-reg-card">

        {/* Esquinas decorativas */}
        <div className="sal-reg-corner sal-rc-tl" />
        <div className="sal-reg-corner sal-rc-tr" />
        <div className="sal-reg-corner sal-rc-bl" />
        <div className="sal-reg-corner sal-rc-br" />

        {/* Logo */}
        <div className="sal-reg-logo">
          <div className="sal-reg-hex">
            🔐
          </div>

          <span className="sal-reg-brand">
            SecureAuth Lab
          </span>

          <span className="sal-reg-badge">
            v2.1
          </span>
        </div>

        <h1 className="sal-reg-title">
          Crear cuenta
        </h1>

        <p className="sal-reg-subtitle">
          Nuevo usuario
        </p>

        {/* Mensaje de error */}
        {error && (
          <div className="sal-reg-error">
            <span>⚠</span>
            {error}
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="sal-reg-success">
            <span>✓</span>
            {success}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleRegister}>

          {/* Nombre */}
          <div className="sal-reg-field-group">
            <label className="sal-reg-label">
              Nombre completo
            </label>

            <input
              className="sal-reg-field"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              onKeyDown={handleKeyDown}
              autoComplete="name"
            />

            <span className="sal-reg-field-ico">
              👤
            </span>
          </div>

          {/* Email */}
          <div className="sal-reg-field-group">
            <label className="sal-reg-label">
              Correo electrónico
            </label>

            <input
              className="sal-reg-field"
              type="email"
              placeholder="usuario@dominio.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />

            <span className="sal-reg-field-ico">
              ✉
            </span>
          </div>

          {/* Contraseña */}
          <div className="sal-reg-field-group">
            <label className="sal-reg-label">
              Contraseña
            </label>

            <input
              className="sal-reg-field"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={handleKeyDown}
              autoComplete="new-password"
            />

            <span className="sal-reg-field-ico">
              🔒
            </span>
          </div>

          {/* Información de seguridad */}
          <div className="sal-reg-hints">
            <span className="sal-reg-hint">
              ✓ bcrypt hash
            </span>

            <span className="sal-reg-hint">
              ✓ Salt rounds
            </span>

            <span className="sal-reg-hint">
              ✓ PostgreSQL
            </span>
          </div>

          {/* Botón */}
          <button
            className="sal-reg-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span>⟳</span>
                Procesando...
              </>
            ) : (
              <>
                <span>▶</span>
                Crear cuenta
              </>
            )}
          </button>

        </form>

        {/* Separador */}
        <div className="sal-reg-divider">
          <div className="sal-reg-div-line" />

          <span className="sal-reg-div-tag">
            // REGISTER
          </span>

          <div className="sal-reg-div-line" />
        </div>

        {/* Link Login */}
        <p className="sal-reg-link-row">
          ¿Ya tienes cuenta?

          <Link to="/">
            Iniciar sesión →
          </Link>
        </p>

        {/* Estado */}
        <div className="sal-reg-status">

          <span className="sal-reg-stat">
            <span className="sal-reg-dot" />
            Sistema operativo
          </span>

          <span className="sal-reg-stat">
            POST /api/auth/register
          </span>

          <span className="sal-reg-stat">
            bcrypt · JWT
          </span>

        </div>

      </div>
    </div>
  );
}