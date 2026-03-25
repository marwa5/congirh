=import { useState } from "react";
import { Input, Btn } from "../components";

const ROLES = ["Employé", "Manager", "Ressources Humaines", "Administrateur"];

export default function LoginView({ onLogin }) {
  const [role, setRole] = useState("Employé");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
      {/* ── Left panel ── */}
      <div style={{
        background: "var(--accent)", padding: 48,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background blobs */}
        <svg style={{ position: "absolute", inset: 0, opacity: 0.07, width: "100%", height: "100%" }} viewBox="0 0 400 600">
          <circle cx="350" cy="80"  r="140" fill="white" />
          <circle cx="50"  cy="420" r="200" fill="white" />
          <circle cx="300" cy="550" r="90"  fill="white" />
        </svg>

        {/* Brand */}
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#fff", letterSpacing: "-0.5px" }}>CongiRH</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>Plateforme de gestion des congés</div>
        </div>

        {/* Features */}
        <div style={{ position: "relative" }}>
          {[
            { icon: "📅", title: "Demandes en ligne",    desc: "Soumettez et suivez vos congés en quelques clics, sans email ni Excel." },
            { icon: "✓",  title: "Validation rapide",    desc: "Les managers approuvent ou refusent en un clic, avec notification instantanée." },
            { icon: "📊", title: "Rapports automatiques",desc: "Tableaux de bord et statistiques générés en temps réel." },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: 12, marginBottom: 22 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0,
              }}>{f.icon}</div>
              <div>
                <div style={{ color: "#fff", fontWeight: 500, fontSize: 13, marginBottom: 2 }}>{f.title}</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "relative", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
          © 2026 CongiRH · Sécurisé par Spring Security
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{
        padding: 48, display: "flex", flexDirection: "column",
        justifyContent: "center", maxWidth: 420, margin: "0 auto", width: "100%",
      }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.4px", marginBottom: 5 }}>Connexion</div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>Accédez à votre espace CongiRH</div>
        </div>

        {/* Role selector */}
        <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8 }}>Se connecter en tant que</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 20 }}>
          {ROLES.map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              padding: "8px 6px",
              border: `0.5px solid ${r === role ? "var(--accent)" : "var(--border)"}`,
              borderRadius: "var(--radius)", fontSize: 11,
              fontWeight: r === role ? 500 : 400,
              background: r === role ? "var(--accent-light)" : "var(--surface)",
              color: r === role ? "var(--accent)" : "var(--text2)",
              cursor: "pointer", fontFamily: "var(--font)",
            }}>{r}</button>
          ))}
        </div>

        <Input label="Adresse email" type="email" defaultValue="t.moreau@entreprise.fr" placeholder="prenom.nom@entreprise.fr" />
        <Input label="Mot de passe"  type="password" defaultValue="••••••••" />

        <Btn onClick={onLogin} style={{ width: "100%", padding: 11, fontSize: 13 }}>
          Se connecter →
        </Btn>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0", color: "var(--text3)", fontSize: 11 }}>
          <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
          ou
          <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
        </div>

        <button style={{
          width: "100%", padding: 10, background: "var(--surface)",
          border: "0.5px solid var(--border)", borderRadius: "var(--radius)",
          fontSize: 12, color: "var(--text2)", cursor: "pointer",
        }}>
          Continuer avec SSO entreprise
        </button>

        <div style={{ textAlign: "center", fontSize: 11, color: "var(--text3)", marginTop: 16 }}>
          🔒 Connexion sécurisée · Chiffrement AES-256
        </div>
      </div>
    </div>
  );
}
