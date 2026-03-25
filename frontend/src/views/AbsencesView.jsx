import { Avatar, Badge, MetricCard, Btn } from "../components";

const ROWS = [
  { initials: "AD", color: "info",    name: "Antoine Dupont",  dept: "Développement", date: "23 mars 2026", type: "Maladie",       duration: "1 jour",   justif: "✓ Certificat fourni", justifColor: "var(--success)", status: "ok"      },
  { initials: "JR", color: "warn",    name: "Julie Renard",    dept: "Marketing",     date: "23 mars 2026", type: "Retard",        duration: "35 min",   justif: "⏳ En attente",       justifColor: "var(--warn)",    status: "pending"  },
  { initials: "PM", color: "danger",  name: "Paul Mercier",    dept: "Commercial",    date: "23 mars 2026", type: "Non justifiée", duration: "Journée",  justif: "✗ Aucun",             justifColor: "var(--danger)",  status: "refused"  },
  { initials: "SL", color: "success", name: "Sophie Laurent",  dept: "Comptabilité",  date: "20 mars 2026", type: "Maladie",       duration: "3 jours",  justif: "✓ Arrêt médical",     justifColor: "var(--success)", status: "ok"      },
  { initials: "BK", color: "accent",  name: "Baptiste Klein",  dept: "RH",            date: "18 mars 2026", type: "Retard",        duration: "20 min",   justif: "✓ Justifié",          justifColor: "var(--success)", status: "ok"      },
  { initials: "CF", color: "danger",  name: "Camille Ferry",   dept: "Développement", date: "15 mars 2026", type: "Non justifiée", duration: "Demi-j.",  justif: "✗ Aucun",             justifColor: "var(--danger)",  status: "refused"  },
];

const TYPE_BADGE = { "Maladie": "info", "Retard": "pending", "Non justifiée": "refused" };
const STATUS_BADGE = { ok: "approved", pending: "pending", refused: "refused" };
const STATUS_LABEL = { ok: "Justifié", pending: "À régulariser", refused: "Action requise" };

const BAR_DATA = [
  ["Développement", 70, "var(--accent)"],
  ["Marketing",     40, "var(--info)"],
  ["Commercial",    55, "var(--danger)"],
  ["Comptabilité",  27, "var(--success)"],
  ["RH",            13, "var(--warn)"],
];

export default function AbsencesView() {
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Gestion des absences</div>
          <div className="page-subtitle">RH · Ressources Humaines</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost">Exporter CSV</Btn>
          <Btn>+ Enregistrer absence</Btn>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid-5" style={{ marginBottom: 16 }}>
        <MetricCard label="Total absences (mars)" value="18" sub="+3 vs février" />
        <MetricCard label="Maladies"              value="9"  sub="50% du total"  color="var(--info)" />
        <MetricCard label="Retards"               value="5"  sub="3 à régulariser" color="var(--warn)" />
        <MetricCard label="Non justifiées"        value="4"  sub="Action requise" color="var(--danger)" />
        <MetricCard label="Taux absentéisme"      value="4.2%" sub="Objectif : < 5%" />
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <input className="toolbar-search" placeholder="Rechercher un employé..." />
        {["Tous les types", "Tous les services", "Mars 2026"].map(f => (
          <select key={f} className="toolbar-select"><option>{f}</option></select>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 16 }}>
        <table className="rh-table">
          <thead>
            <tr>
              {["Employé","Date","Type","Durée","Justificatif","Statut","Actions"].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={r.initials} color={r.color} size={26} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: "var(--text3)" }}>{r.dept}</div>
                    </div>
                  </div>
                </td>
                <td>{r.date}</td>
                <td><Badge type={TYPE_BADGE[r.type]}>{r.type}</Badge></td>
                <td>{r.duration}</td>
                <td><span style={{ fontSize: 11, color: r.justifColor }}>{r.justif}</span></td>
                <td><Badge type={STATUS_BADGE[r.status]}>{STATUS_LABEL[r.status]}</Badge></td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: "0.5px solid var(--border)", background: "transparent", color: "var(--text2)", cursor: "pointer" }}>Voir</button>
                    {r.status !== "ok" && (
                      <button style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: "0.5px solid var(--border)", background: "transparent", color: "var(--text2)", cursor: "pointer" }}>Relancer</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid-2">
        <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Absences par service (mars)</div>
          {BAR_DATA.map(([name, pct, color]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 90, fontSize: 11, color: "var(--text2)", flexShrink: 0 }}>{name}</div>
              <div style={{ flex: 1, height: 8, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", width: 28, textAlign: "right" }}>{Math.round(pct / 10)}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Répartition par type</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="36" fill="none" stroke="var(--accent-light)" strokeWidth="16" />
              <circle cx="45" cy="45" r="36" fill="none" stroke="var(--accent)"     strokeWidth="16" strokeDasharray="113.1 113.1" strokeDashoffset="0"      transform="rotate(-90 45 45)" />
              <circle cx="45" cy="45" r="36" fill="none" stroke="#EF9F27"           strokeWidth="16" strokeDasharray="62.8 162.8"  strokeDashoffset="-113.1"  transform="rotate(-90 45 45)" />
              <circle cx="45" cy="45" r="36" fill="none" stroke="var(--danger)"     strokeWidth="16" strokeDasharray="50.3 175.9"  strokeDashoffset="-176.0"  transform="rotate(-90 45 45)" />
              <text x="45" y="49" textAnchor="middle" fontFamily="DM Sans" fontSize="9" fill="var(--text3)">18 abs.</text>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["var(--accent)", "Maladie",       "9 (50%)"],
                ["#EF9F27",       "Retard",         "5 (28%)"],
                ["var(--danger)", "Non justifiée",  "4 (22%)"]].map(([bg, label, val]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: bg, flexShrink: 0 }} />
                  <div style={{ flex: 1, color: "var(--text2)" }}>{label}</div>
                  <div style={{ fontWeight: 500 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14, paddingTop: 10, borderTop: "0.5px solid var(--border2)" }}>
            <Btn style={{ width: "100%", padding: 8, fontSize: 12 }}>Générer rapport complet</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
