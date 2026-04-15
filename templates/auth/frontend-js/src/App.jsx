import { useMemo, useState } from "react";
import {
  callProtected,
  clearToken,
  getToken,
  login,
  register,
  setToken
} from "./lib/auth.js";

export default function App() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [status, setStatus] = useState("");
  const [protectedResult, setProtectedResult] = useState("");

  const token = useMemo(() => getToken(), [status]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("");
    setProtectedResult("");
    try {
      const res = mode === "login" ? await login(email, password) : await register(email, password);
      setToken(res.token);
      setStatus(`✅ ${mode} ok (user: ${res.user.email})`);
    } catch (err) {
      setStatus(`❌ ${err?.message || "request failed"}`);
    }
  }

  async function onProtected() {
    setProtectedResult("");
    try {
      const res = await callProtected();
      setProtectedResult(`✅ protected ok (userId: ${res.userId})`);
    } catch (err) {
      setProtectedResult(`❌ ${err?.message || "request failed"}`);
    }
  }

  function onLogout() {
    clearToken();
    setStatus("Logged out");
    setProtectedResult("");
  }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 520, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>Auth Demo</h1>
      <p style={{ marginTop: 4, color: "#555" }}>
        Uses <code>/api/auth</code> + JWT in <code>Authorization</code> header.
      </p>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <button onClick={() => setMode("login")} disabled={mode === "login"}>
          Login
        </button>
        <button onClick={() => setMode("register")} disabled={mode === "register"}>
          Register
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={onLogout} disabled={!token}>
          Logout
        </button>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>
        <button type="submit">{mode === "login" ? "Login" : "Create account"}</button>
      </form>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12, color: "#555" }}>
          Token: {token ? `${token.slice(0, 18)}…` : "(none)"}
        </div>
        {status ? <pre style={{ whiteSpace: "pre-wrap" }}>{status}</pre> : null}
      </div>

      <hr style={{ margin: "18px 0" }} />

      <button onClick={onProtected}>Call protected endpoint</button>
      {protectedResult ? <pre style={{ whiteSpace: "pre-wrap" }}>{protectedResult}</pre> : null}

      <p style={{ marginTop: 18, fontSize: 12, color: "#666" }}>
        Tip: start backend on <code>localhost:5000</code>. Vite proxies <code>/api</code> → backend.
      </p>
    </main>
  );
}

