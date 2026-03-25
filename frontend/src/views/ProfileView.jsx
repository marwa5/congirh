import { Avatar, Badge, Card, SectionTitle, Btn } from "../components";

const HISTORY = [
  { icon: "⏳", bg: "var(--warn-bg)",     name: "Congé annuel",     detail: "28 mars – 3 avr. 2026 · En attente manager", status: "pending",  days: "−6 j", dcolor: "var(--warn)" },
  { icon: "✓",  bg: "var(--success-bg)", name: "RTT",              detail: "15 mars 2026 · Approuvé par C. Dumont",        status: "approved", days: "−1 j", dcolor: "var(--success)" },
  { icon: "✓",  bg: "var(--success-bg)", name: "Congé annuel",     detail: "2 – 13 fév. 2026 · Approuvé",                  status: "approved", days: "−6 j", dcolor: "var(--success)" },
  { icon: "✗",  bg: "var(--danger-bg)",  name: "Congé sans solde", detail: '20 – 24 janv. 2026 · "Période de clôture"',    status: "refused",  days: "—",    dcolor: "var(--text3)" },
];

const INFO_ROWS = [
  ["Service", "Développement"],
  ["Manager", "Claire Dumont"],
  ["Entrée",  "14 sept. 2021"],
  ["Email",   "t.moreau@entreprise.fr"],
  ["Statut",  "Actif"],
];

const SOLDES = [
  ["Congé annuel", 18, 25, "var(--accent)"],
  ["RTT",          6,  10, "var(--info)"],
  ["Récupération", 2,  3,  "var(--success)"],
];

export default function ProfileView() {
  const circ = 2 * Math.PI * 36;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Mon profil & solde</div>
          <div className="page-subtitle">Thomas Moreau · Développeur Senior</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, alignItems: "start" }}>
        {/* ── Left column ── */}
        <div>
          <Card style={{ marginBottom: 14 }}>
            {/* Profile header */}
            <div style={{ textAlign: "center", paddingBottom: 16, borderBottom: "0.5px solid var(--border2)", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <Avatar initials="TM" color="accent" size={60} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "-0.3px" }}>Thomas Moreau</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>Développeur Senior</div>
              <div style={{ marginTop: 8, display: "inline-block", fontSize: 10, padding: "3px 10px", borderRadius: 20, background: "var(--accent-light)", color: "var(--accent)", fontWeight: 500 }}>EMPLOYEE</div>
            </div>

            <SectionTitle>Informations</SectionTitle>
            {INFO_ROWS.map(([key, val]) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid var(--border2)", fontSize: 12 }}>
                <span style={{ color: "var(--text3)" }}>{key}</span>
                <span style={{ fontWeight: 500, color: key === "Statut" ? "var(--success)" : "var(--text)", fontSize: key === "Email" ? 11 : 12 }}>{val}</span>
              </div>
            ))}
          </Card>

          <Card>
            <SectionTitle>Notifications</SectionTitle>
            {[
              { dot: "var(--warn)",    text: "Demande du 28 mars en attente",          time: "Auj." },
              { dot: "var(--success)", text: "RTT du 15 mars approuvé par C. Dumont",  time: "Mar." },
              { dot: "var(--accent)",  text: "Votre solde a été mis à jour par les RH", time: "5 mars" },
            ].map((n, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < 2 ? "0.5px solid var(--border2)" : "none", fontSize: 12 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.dot, flexShrink: 0 }} />
                <div style={{ flex: 1, color: "var(--text2)" }}>{n.text}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{n.time}</div>
              </div>
            ))}
          </Card>
        </div>

        {/* ── Right column ── */}
        <div>
          {/* Annual leave donut */}
          <Card style={{ marginBottom: 14 }}>
            <SectionTitle>Congé annuel 2026</SectionTitle>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink: 0 }}>
                <circle cx="45" cy="45" r="36" fill="none" stroke="var(--surface2)" strokeWidth="9" />
                <circle cx="45" cy="45" r="36" fill="none" stroke="var(--accent)" strokeWidth="9"
                  strokeDasharray={`${(18 / 25) * circ} ${circ}`}
                  strokeLinecap="round" transform="rotate(-90 45 45)" />
                <text x="45" y="42" textAnchor="middle" fontFamily="DM Sans" fontSize="18" fontWeight="500" fill="var(--text)">18</text>
                <text x="45" y="55" textAnchor="middle" fontFamily="DM Sans" fontSize="9" fill="var(--text3)">/ 25 j</text>
              </svg>

              <div style={{ flex: 1 }}>
                {[["Total annuel", "25 jours", 100, "var(--surface2)"], ["Utilisés", "7 jours", 28, "var(--accent-mid)"], ["En attente", "6 jours", 24, "#FAC775"], ["Disponibles", "12 jours", 48, "var(--success)"]].map(([label, val, pct, color]) => (
                  <div key={label} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                      <span style={{ color: "var(--text2)" }}>{label}</span>
                      <span style={{ fontWeight: 500 }}>{val}</span>
                    </div>
                    <div style={{ height: 5, background: "var(--surface2)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* RTT + Récupération */}
          <div className="grid-2" style={{ marginBottom: 14 }}>
            {[["RTT", 6, 10, "var(--info)"], ["Récupération", 2, 3, "var(--success)"]].map(([name, val, total, color]) => (
              <Card key={name} style={{ padding: 14 }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8 }}>{name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 500, color }}>{val}</span>
                  <span style={{ fontSize: 11, color: "var(--text3)" }}>/ {total} j</span>
                </div>
                <div style={{ height: 4, background: "var(--surface2)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${val / total * 100}%`, background: color, borderRadius: 2 }} />
                </div>
              </Card>
            ))}
          </div>

          {/* History */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <SectionTitle style={{ marginBottom: 0 }}>Historique des demandes</SectionTitle>
              <span style={{ fontSize: 11, color: "var(--text3)" }}>2026</span>
            </div>
            {HISTORY.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: i < HISTORY.length - 1 ? "0.5px solid var(--border2)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: h.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{h.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{h.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 1 }}>{h.detail}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  <Badge type={h.status}>{{ pending: "En attente", approved: "Approuvé", refused: "Refusé" }[h.status]}</Badge>
                  <div style={{ fontSize: 12, fontWeight: 500, color: h.dcolor }}>{h.days}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <Btn style={{ width: "100%", padding: 9, fontSize: 12 }}>+ Nouvelle demande</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
