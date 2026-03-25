import { Avatar, Badge, Card, MetricCard, SectionTitle } from "../components";

const requests = [
  { initials: "TM", color: "accent",  name: "Thomas Moreau",   type: "Congé annuel",    dates: "28 mars – 4 avr.", days: "6 j.", status: "pending"  },
  { initials: "LB", color: "success", name: "Léa Bernard",     type: "RTT",             dates: "25 mars",          days: "1 j.", status: "approved" },
  { initials: "NC", color: "warn",    name: "Nicolas Chabert", type: "Congé sans solde",dates: "1–5 avr.",         days: "5 j.", status: "pending"  },
  { initials: "MF", color: "danger",  name: "Marie Fontaine",  type: "Congé annuel",    dates: "10–14 avr.",       days: "5 j.", status: "refused"  },
  { initials: "AD", color: "info",    name: "Antoine Dupont",  type: "Maladie",         dates: "24 mars",          days: "1 j.", status: "info"     },
];

const STATUS_LABELS = { pending: "En attente", approved: "Approuvé", refused: "Refusé", info: "Absence" };

const MONTHS  = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"];
const BAR_DATA = [38, 22, 42, 18, 25, 31];

const SERVICES = [
  ["Développement", 68, "var(--accent)"],
  ["Marketing",     45, "var(--info)"],
  ["Comptabilité",  82, "var(--success)"],
  ["Commercial",    31, "var(--warn)"],
];

const ABSENCES = [
  { dot: "var(--success)", name: "Léa Bernard",   type: "RTT",           detail: "Justifié"          },
  { dot: "var(--info)",    name: "Antoine Dupont", type: "Maladie",       detail: "Certificat fourni" },
  { dot: "var(--warn)",    name: "Julie Renard",   type: "Retard",        detail: "09h42 → 10h15"     },
  { dot: "var(--danger)",  name: "Paul Mercier",   type: "Non justifiée", detail: "En attente"        },
];

export default function DashboardView() {
  const maxBar = Math.max(...BAR_DATA);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="page-title">Tableau de bord</div>
          <div className="page-subtitle">Lundi 23 mars 2026</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar initials="SR" color="info" size={28} />
          <span style={{ fontSize: 12, color: "var(--text2)" }}>Sophie RH</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid-4">
        <MetricCard label="Demandes en attente"    value="7"    sub="+2 cette semaine"    color="var(--accent)"  barPct={35} />
        <MetricCard label="Congés approuvés (mars)"value="23"   sub="12 employés absents" color="var(--success)" barPct={60} barColor="var(--success)" />
        <MetricCard label="Taux d'absentéisme"     value="4.2%" sub="−0.8% vs février"    color="var(--warn)"    barPct={42} barColor="var(--warn)" />
        <MetricCard label="Soldes faibles"          value="3"    sub="Employés < 5 jours"  color="var(--danger)"  barPct={15} barColor="var(--danger)" />
      </div>

      {/* Recent requests + Bar chart */}
      <div className="grid-2">
        <Card>
          <SectionTitle>Demandes récentes</SectionTitle>
          {requests.map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 0",
              borderBottom: i < requests.length - 1 ? "0.5px solid var(--border2)" : "none",
            }}>
              <Avatar initials={r.initials} color={r.color} size={30} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{r.type} · {r.dates} · {r.days}</div>
              </div>
              <Badge type={r.status}>{STATUS_LABELS[r.status]}</Badge>
            </div>
          ))}
        </Card>

        <Card>
          <SectionTitle>Jours de congé par mois</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140, paddingTop: 10 }}>
            {MONTHS.map((m, i) => (
              <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: Math.round(BAR_DATA[i] / maxBar * 110), background: "var(--accent)", borderRadius: "3px 3px 0 0", opacity: 0.75 + i * 0.04 }} />
                <div style={{ fontSize: 9, color: "var(--text3)" }}>{m}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent)" }} />Congés
            </div>
          </div>
        </Card>
      </div>

      {/* Soldes + Absences du jour */}
      <div className="grid-2">
        <Card>
          <SectionTitle>Soldes par service</SectionTitle>
          {SERVICES.map(([name, pct, color]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: "var(--text2)", width: 90, flexShrink: 0 }}>{name}</div>
              <div style={{ flex: 1, height: 6, background: "var(--surface2)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", width: 32, textAlign: "right" }}>{pct}%</div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>% de solde annuel restant moyen</div>
        </Card>

        <Card>
          <SectionTitle>Absences du jour</SectionTitle>
          {ABSENCES.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 0",
              borderBottom: i < ABSENCES.length - 1 ? "0.5px solid var(--border2)" : "none",
              fontSize: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.dot, flexShrink: 0 }} />
              <div style={{ flex: 1, fontWeight: 500 }}>{a.name}</div>
              <div style={{ color: "var(--text3)" }}>{a.type}</div>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>{a.detail}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, paddingTop: 8, borderTop: "0.5px solid var(--border2)", fontSize: 11, color: "var(--text3)" }}>
            4 absences enregistrées · 1 à régulariser
          </div>
        </Card>
      </div>
    </div>
  );
}
