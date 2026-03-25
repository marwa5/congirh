import { MetricCard, Card, Btn } from "../components";

const MONTHS  = ["Jan","Fév","Mar","Avr","Mai","Jun"];
const ANNUAL  = [38, 22, 42, 18, 25, 31];
const RTT     = [12,  8, 15,  6, 10, 12];
const SICK    = [14,  9, 18,  5,  7, 11];
const MAX_BAR = 70;

const SERVICES = [
  { name: "Développement", jours: 98, absences: 12, taux: "3.8%", status: "ok",      spark: [8,12,10,14,11] },
  { name: "Commercial",    jours: 72, absences: 18, taux: "6.1%", status: "refused",  spark: [6,10,14,18,20] },
  { name: "Marketing",     jours: 54, absences:  9, taux: "4.4%", status: "pending",  spark: [12,14,11,13,12] },
  { name: "Comptabilité",  jours: 44, absences:  5, taux: "2.9%", status: "ok",       spark: [14,10,8,9,7] },
  { name: "RH",            jours: 22, absences:  3, taux: "3.1%", status: "ok",       spark: [10,10,9,8,9] },
];

const HEATMAP = [14, 9, 18, 5, 7, 11, 28, 35, 6, 8, 12, 20];
const HEAT_MONTHS = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
const heatMax = Math.max(...HEATMAP);

const heatColor = (v) => {
  const p = v / heatMax;
  if (p > 0.8) return { bg: "#534AB7", fg: "#EEEDFE" };
  if (p > 0.6) return { bg: "#7F77DD", fg: "#EEEDFE" };
  if (p > 0.4) return { bg: "#AFA9EC", fg: "#3C3489" };
  if (p > 0.2) return { bg: "#CECBF6", fg: "#534AB7" };
  return { bg: "#EEEDFE", fg: "#534AB7" };
};

const STATUS_BADGE_STYLE = {
  ok:      { bg: "var(--success-bg)", color: "var(--success)", label: "Bon" },
  pending: { bg: "var(--warn-bg)",    color: "var(--warn)",    label: "Moyen" },
  refused: { bg: "var(--danger-bg)",  color: "var(--danger)",  label: "Élevé" },
};

const ABS_RATES = [4.8, 4.2, 4.2];

export default function ReportsView() {
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Rapports & statistiques</div>
          <div className="page-subtitle">Mise à jour : 23 mars 2026 · 08h00</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost">Exporter Excel</Btn>
          <Btn>Exporter CSV</Btn>
        </div>
      </div>

      {/* Filters */}
      <div className="toolbar" style={{ marginBottom: 16 }}>
        {["Année 2026", "Tous les services", "Tous les types"].map(f => (
          <select key={f} className="toolbar-select"><option>{f}</option></select>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: "var(--text3)" }}>55 employés · 5 services</span>
      </div>

      {/* KPIs */}
      <div className="grid-4" style={{ marginBottom: 16 }}>
        <MetricCard label="Jours de congé pris (2026)" value="312"  sub="+8% vs 2025"       color="var(--accent)"  />
        <MetricCard label="Taux d'absentéisme moyen"   value="4.2%" sub="−0.6% vs 2025"      color="var(--warn)"    />
        <MetricCard label="Demandes traitées"           value="187"  sub="98% traitées < 48h" color="var(--success)" />
        <MetricCard label="Taux de refus"               value="6.4%" sub="−1.2% vs 2025"      color="var(--danger)"  />
      </div>

      {/* Charts row */}
      <div className="grid-2" style={{ marginBottom: 14 }}>
        {/* Grouped bar chart */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Jours de congé par mois (2026)</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 150, paddingTop: 10 }}>
            {MONTHS.map((m, i) => (
              <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 130 }}>
                  {[{v: ANNUAL[i], c:"var(--accent)"},{v:RTT[i],c:"var(--accent-mid)"},{v:SICK[i],c:"var(--info)"}].map((b, j) => (
                    <div key={j} style={{ flex: 1, height: Math.round(b.v / MAX_BAR * 120), background: b.c, borderRadius: "3px 3px 0 0" }} />
                  ))}
                </div>
                <div style={{ fontSize: 9, color: "var(--text3)" }}>{m}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            {[["var(--accent)","Congé annuel"],["var(--accent-mid)","RTT"],["var(--info)","Maladie"]].map(([c, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)" }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}
              </div>
            ))}
          </div>
        </Card>

        {/* Absenteeism line chart */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Absentéisme mensuel (%)</div>
          <div style={{ position: "relative", height: 140 }}>
            <svg width="100%" height="140" viewBox="0 0 300 140" preserveAspectRatio="none">
              {/* 5% threshold */}
              <line x1="0" y1={130-5/7*120} x2="300" y2={130-5/7*120} stroke="#E24B4A" strokeWidth="0.5" strokeDasharray="4,3" />
              {/* Line segments and points */}
              {ABS_RATES.map((v, i) => {
                const x = i * 60;
                const y = 130 - v / 7 * 120;
                const nx = (i+1)*60;
                const ny = i < ABS_RATES.length-1 ? 130 - ABS_RATES[i+1]/7*120 : null;
                return (
                  <g key={i}>
                    {ny !== null && <line x1={x} y1={y} x2={nx} y2={ny} stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />}
                    <circle cx={x} cy={y} r="4" fill="var(--accent)" />
                    <text x={x} y={y-8} textAnchor="middle" fontSize="9" fill="var(--text2)">{v}%</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {["Jan","Fév","Mar","—","—","—"].map((m, i) => <span key={i} style={{ fontSize: 9, color: "var(--text3)" }}>{m}</span>)}
          </div>
          <div style={{ marginTop: 10, background: "var(--warn-bg)", borderRadius: "var(--radius)", padding: "8px 10px", fontSize: 11, color: "var(--warn)" }}>
            Objectif : maintenir l'absentéisme sous 5%
          </div>
        </Card>
      </div>

      {/* By-service table */}
      <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 14 }}>
        <table className="rh-table">
          <thead>
            <tr>
              {["Service","Jours congé","Jours absence","Taux absent.","Tendance","Statut"].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((s, i) => {
              const bs = STATUS_BADGE_STYLE[s.status];
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{s.name}</td>
                  <td>{s.jours}</td>
                  <td>{s.absences}</td>
                  <td>{s.taux}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 24 }}>
                      {s.spark.map((h, j) => (
                        <div key={j} style={{ width: 6, borderRadius: 1, height: h, background: s.status === "refused" && j > 2 ? "var(--danger)" : "var(--accent-mid)" }} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 5, fontWeight: 500, background: bs.bg, color: bs.color }}>{bs.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Heatmap */}
      <Card>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Heatmap — absences par mois 2026</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 3, marginBottom: 4 }}>
          {HEAT_MONTHS.map(m => <div key={m} style={{ fontSize: 9, color: "var(--text3)", textAlign: "center" }}>{m}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 3 }}>
          {HEATMAP.map((v, i) => {
            const c = heatColor(v);
            return <div key={i} style={{ height: 28, borderRadius: 4, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 500, color: c.fg }}>{v}</div>;
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 10, color: "var(--text3)" }}>Moins</span>
          {["#EEEDFE","#CECBF6","#AFA9EC","#7F77DD","#534AB7"].map((c, i) => (
            <div key={i} style={{ width: 16, height: 10, borderRadius: 2, background: c }} />
          ))}
          <span style={{ fontSize: 10, color: "var(--text3)" }}>Plus</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 10, color: "var(--text3)" }}>Pic estival prévisible (Juillet–Août)</span>
        </div>
      </Card>
    </div>
  );
}
