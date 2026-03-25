import { Avatar, MetricCard, Btn } from "../components";

const DAYS = ["L 16","M 17","M 18","J 19","V 20","S 21","D 22","L 23","M 24","M 25"];

const TEAM = [
  { initials: "TM", color: "accent",  name: "Thomas Moreau",  dept: "Développement", events: { "M 17":"annual","M 18":"annual","J 19":"annual","M 25":"pending" } },
  { initials: "LB", color: "success", name: "Léa Bernard",    dept: "Développement", events: { "M 25":"rtt" } },
  { initials: "AD", color: "info",    name: "Antoine Dupont", dept: "Développement", events: { "L 23":"sick" } },
  { initials: "MF", color: "danger",  name: "Marie Fontaine", dept: "Marketing",     events: { "L 16":"annual","M 17":"annual","M 18":"annual","J 19":"annual","V 20":"annual" } },
  { initials: "JR", color: "warn",    name: "Julie Renard",   dept: "Marketing",     events: { "L 23":"absence" } },
  { initials: "PM", color: "danger",  name: "Paul Mercier",   dept: "Commercial",    events: { "L 23":"absence" } },
  { initials: "SL", color: "success", name: "Sophie Laurent", dept: "Comptabilité",  events: { "M 18":"sick","J 19":"sick","V 20":"sick" } },
  { initials: "NC", color: "accent",  name: "Nicolas Chabert",dept: "Développement", events: {} },
];

const EVENT_STYLE = {
  annual:  { bg: "var(--accent-light)", color: "var(--accent)", label: "Congé" },
  rtt:     { bg: "var(--info-bg)",      color: "var(--info)",   label: "RTT"   },
  sick:    { bg: "var(--danger-bg)",    color: "var(--danger)", label: "Maladie" },
  pending: { bg: "var(--warn-bg)",      color: "var(--warn)",   label: "En att." },
  absence: { bg: "var(--danger-bg)",    color: "var(--danger)", label: "Absent", borderLeft: "2px solid var(--danger)" },
};

const LEGEND = [
  { bg: "var(--accent-light)", label: "Congé validé" },
  { bg: "var(--info-bg)",      label: "RTT" },
  { bg: "var(--danger-bg)",    label: "Maladie" },
  { bg: "var(--warn-bg)",      label: "En attente" },
  { bg: "#FAFAF8",             label: "Week-end" },
];

const isWeekend = (d) => d.startsWith("S") || d.startsWith("D");
const isToday   = (d) => d === "L 23";

export default function CalendarView() {
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Calendrier d'équipe</div>
          <div className="page-subtitle">Semaine du 16 au 25 mars 2026</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius)", padding: "6px 12px" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: 16 }}>‹</button>
            <span style={{ fontSize: 13, fontWeight: 500, minWidth: 90, textAlign: "center" }}>Mars 2026</span>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: 16 }}>›</button>
          </div>

          {/* View toggle */}
          <div style={{ display: "flex", background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            {["Mois","Semaine","Équipe"].map((v, i) => (
              <button key={v} style={{
                padding: "6px 12px", fontSize: 12, border: "none", cursor: "pointer",
                background: i === 1 ? "var(--accent-light)" : "transparent",
                color: i === 1 ? "var(--accent)" : "var(--text2)",
                fontWeight: i === 1 ? 500 : 400,
                borderRight: i < 2 ? "0.5px solid var(--border)" : "none",
                fontFamily: "var(--font)",
              }}>{v}</button>
            ))}
          </div>

          <select className="toolbar-select"><option>Tous les services</option><option>Développement</option><option>Marketing</option></select>
          <Btn>+ Nouvelle demande</Btn>
        </div>
      </div>

      {/* Grid */}
      <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "auto" }}>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "160px repeat(10,1fr)", background: "var(--surface2)", borderBottom: "0.5px solid var(--border)" }}>
          <div style={{ padding: "8px 12px", fontSize: 10, color: "var(--text3)", fontWeight: 500, borderRight: "0.5px solid var(--border)" }}>Employé</div>
          {DAYS.map(d => (
            <div key={d} style={{
              fontSize: 9, textAlign: "center", padding: "5px 2px",
              borderRight: "0.5px solid var(--border2)",
              color: isWeekend(d) ? "var(--accent-mid)" : isToday(d) ? "var(--accent)" : "var(--text3)",
              fontWeight: isToday(d) ? 500 : 400,
            }}>{d}</div>
          ))}
        </div>

        {/* Employee rows */}
        {TEAM.map(member => (
          <div key={member.name} style={{ display: "grid", gridTemplateColumns: "160px repeat(10,1fr)", borderBottom: "0.5px solid var(--border2)" }}>
            {/* Name cell */}
            <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 7, borderRight: "0.5px solid var(--border)", background: "var(--surface)" }}>
              <Avatar initials={member.initials} color={member.color} size={22} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{member.name}</div>
                <div style={{ fontSize: 9, color: "var(--text3)" }}>{member.dept}</div>
              </div>
            </div>

            {/* Day cells */}
            {DAYS.map(d => {
              const ev = member.events[d];
              const s  = ev ? EVENT_STYLE[ev] : null;
              return (
                <div key={d} style={{
                  padding: 3, minHeight: 38,
                  borderRight: "0.5px solid var(--border2)",
                  background: isWeekend(d) ? "#FAFAF8" : isToday(d) ? "rgba(83,74,183,0.03)" : "transparent",
                  position: "relative",
                }}>
                  {isToday(d) && (
                    <div style={{ position: "absolute", top: 0, left: "50%", width: 1.5, height: "100%", background: "rgba(83,74,183,0.15)", transform: "translateX(-50%)" }} />
                  )}
                  {s && (
                    <div style={{
                      background: s.bg, color: s.color, borderRadius: 3,
                      padding: "2px 5px", fontSize: 9, fontWeight: 500,
                      position: "relative",
                      borderLeft: s.borderLeft,
                    }}>{s.label}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
        {LEGEND.map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)" }}>
            <div style={{ width: 18, height: 8, borderRadius: 2, background: l.bg, border: "0.5px solid var(--border)" }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Summary metrics */}
      <div className="grid-4" style={{ marginTop: 14 }}>
        <MetricCard label="Absents aujourd'hui"      value="3" sub="sur 42 employés"     color="var(--danger)" />
        <MetricCard label="En congé cette semaine"   value="5" sub="Congé annuel + RTT"  color="var(--accent)" />
        <MetricCard label="Demandes en attente"      value="2" sub="À valider sous 48h"  color="var(--warn)" />
        <MetricCard label="Conflits détectés"        value="1" sub="Équipe Développement" color="var(--danger)" />
      </div>
    </div>
  );
}
