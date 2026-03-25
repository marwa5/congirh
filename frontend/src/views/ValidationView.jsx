import { useState } from "react";
import { Avatar, Badge, Card, MetricCard, Btn } from "../components";

const INITIAL_REQUESTS = [
  { id: 1, initials: "TM", color: "accent",  name: "Thomas Moreau",   type: "Congé annuel",    dates: "28 mars – 3 avr. 2026", days: "6 jours ouvrés", submitted: "23 mars", balance: 18, after: 12, status: "pending",  conflict: true,  comment: "Vacances en famille prévues de longue date." },
  { id: 2, initials: "NC", color: "warn",    name: "Nicolas Chabert", type: "Congé sans solde",dates: "1 – 5 avr. 2026",       days: "5 jours ouvrés", submitted: "22 mars", balance: 3,  after: 3,  status: "pending",  conflict: false, comment: "" },
  { id: 3, initials: "LB", color: "success", name: "Léa Bernard",     type: "RTT",             dates: "25 mars 2026",          days: "1 jour",         submitted: "20 mars", balance: 7,  after: 6,  status: "approved", conflict: false, comment: "" },
  { id: 4, initials: "MF", color: "danger",  name: "Marie Fontaine",  type: "Congé annuel",    dates: "10 – 14 avr. 2026",     days: "5 jours",        submitted: "19 mars", balance: 10, after: 5,  status: "refused",  conflict: false, comment: "Chevauchement avec la période de clôture." },
];

const STATUS_LABEL = { pending: "En attente", approved: "Approuvé", refused: "Refusé" };

const TEAM_DAYS = ["L 16","M 17","M 18","J 19","V 20","S 21","D 22","L 23","M 24","M 25"];
const TEAM_EVENTS = {
  "Thomas Moreau":   { "M 17": "annual", "M 18": "annual", "J 19": "annual", "M 25": "pending" },
  "Léa Bernard":     { "M 25": "rtt" },
  "Antoine Dupont":  { "L 23": "sick" },
  "Nicolas Chabert": {},
};
const EVENT_STYLE = {
  annual:  { bg: "var(--accent-light)", color: "var(--accent)", label: "Congé" },
  rtt:     { bg: "var(--info-bg)",      color: "var(--info)",   label: "RTT" },
  sick:    { bg: "var(--danger-bg)",    color: "var(--danger)", label: "Maladie" },
  pending: { bg: "var(--warn-bg)",      color: "var(--warn)",   label: "En att." },
};

export default function ValidationView() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [comments, setComments] = useState({});

  const act = (id, newStatus) =>
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));

  const pending  = requests.filter(r => r.status === "pending").length;
  const approved = requests.filter(r => r.status === "approved").length;
  const refused  = requests.filter(r => r.status === "refused").length;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Validation des demandes</div>
          <div className="page-subtitle">Manager · Claire Dumont · Équipe Développement</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid-4" style={{ marginBottom: 18 }}>
        <MetricCard label="En attente"       value={pending}  color="var(--warn)" />
        <MetricCard label="Approuvées (mars)"value={approved} color="var(--success)" />
        <MetricCard label="Refusées (mars)"  value={refused}  color="var(--danger)" />
        <MetricCard label="Membres d'équipe" value="8" />
      </div>

      {/* Request cards */}
      {requests.map(r => (
        <div key={r.id} style={{
          background: "var(--surface)",
          border: `${r.status === "pending" ? "1.5px" : "0.5px"} solid ${r.status === "pending" ? "var(--accent)" : "var(--border)"}`,
          borderRadius: "var(--radius-lg)", padding: "16px 18px", marginBottom: 10,
          display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "start",
        }}>
          <Avatar initials={r.initials} color={r.color} size={36} />

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
              <Badge type={r.status}>{STATUS_LABEL[r.status]}</Badge>
              {r.conflict && (
                <span style={{ fontSize: 10, background: "var(--danger-bg)", color: "var(--danger)", padding: "2px 7px", borderRadius: 4, fontWeight: 500 }}>
                  ⚠ Conflit planning
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text3)", flexWrap: "wrap", marginBottom: 5 }}>
              <span>{r.type}</span><span>{r.dates}</span><span>{r.days}</span><span>Soumis le {r.submitted}</span>
            </div>

            <div style={{ fontSize: 11, color: "var(--text3)" }}>
              Solde avant : <strong>{r.balance} j</strong> · après validation : <strong>{r.after} j</strong>
            </div>

            {r.comment && (
              <div style={{ fontSize: 12, color: "var(--text2)", fontStyle: "italic", marginTop: 4 }}>"{r.comment}"</div>
            )}

            {r.status === "pending" && (
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: "0.5px solid var(--border2)" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 5 }}>Commentaire (facultatif)</div>
                <input
                  value={comments[r.id] || ""}
                  onChange={e => setComments(c => ({ ...c, [r.id]: e.target.value }))}
                  placeholder="Ajouter un commentaire au salarié..."
                  style={{ width: "100%", padding: "7px 10px", border: "0.5px solid var(--border)", borderRadius: 8, fontSize: 12, outline: "none", fontFamily: "var(--font)", background: "var(--surface)", color: "var(--text)" }}
                />
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            {r.status === "pending" ? (
              <>
                <Btn variant="success" onClick={() => act(r.id, "approved")}>✓ Approuver</Btn>
                <Btn variant="danger"  onClick={() => act(r.id, "refused")}>✗ Refuser</Btn>
              </>
            ) : (
              <Btn variant="ghost" onClick={() => act(r.id, "pending")}>Réouvrir</Btn>
            )}
          </div>
        </div>
      ))}

      {/* Team calendar */}
      <Card style={{ marginTop: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Vue équipe — semaine du 16 au 25 mars</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 8, paddingLeft: 128 }}>
          {TEAM_DAYS.map(d => (
            <div key={d} style={{ flex: 1, textAlign: "center", fontSize: 10, color: d.startsWith("S") || d.startsWith("D") ? "var(--accent-mid)" : d === "L 23" ? "var(--accent)" : "var(--text3)", fontWeight: d === "L 23" ? 500 : 400 }}>{d}</div>
          ))}
        </div>
        {Object.entries(TEAM_EVENTS).map(([name, events]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 120, fontSize: 11, color: "var(--text2)", flexShrink: 0 }}>{name}</div>
            {TEAM_DAYS.map(d => {
              const ev = events[d];
              const s  = ev ? EVENT_STYLE[ev] : null;
              return (
                <div key={d} style={{
                  flex: 1, height: 22, borderRadius: 4,
                  background: s ? s.bg : d.startsWith("S") || d.startsWith("D") ? "var(--surface2)" : "var(--bg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 500, color: s ? s.color : "transparent",
                  border: d === "L 23" ? "1.5px solid var(--accent-mid)" : "none",
                }}>
                  {s ? s.label : ""}
                </div>
              );
            })}
          </div>
        ))}
      </Card>
    </div>
  );
}
