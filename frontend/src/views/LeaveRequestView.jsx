import { useState } from "react";
import { Card, SectionTitle, Btn, Input, Select, Badge } from "../components";

function workingDays(start, end) {
  if (!start || !end) return 0;
  let count = 0;
  let cur = new Date(start);
  const e = new Date(end);
  while (cur <= e) {
    const d = cur.getDay();
    if (d !== 0 && d !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

const BALANCE = { annual: 18, rtt: 6, recovery: 2 };

const DonutRing = ({ value, total, color }) => {
  const circ = 2 * Math.PI * 36;
  const pct  = value / total;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r="36" fill="none" stroke="var(--surface2)" strokeWidth="9" />
      <circle cx="45" cy="45" r="36" fill="none" stroke={color} strokeWidth="9"
        strokeDasharray={`${pct * circ} ${circ}`}
        strokeLinecap="round" transform="rotate(-90 45 45)" />
      <text x="45" y="42" textAnchor="middle" fontFamily="DM Sans" fontSize="18" fontWeight="500" fill="var(--text)">{value}</text>
      <text x="45" y="55" textAnchor="middle" fontFamily="DM Sans" fontSize="9" fill="var(--text3)">/ {total} j</text>
    </svg>
  );
};

export default function LeaveRequestView() {
  const [startDate, setStart]   = useState("2026-03-28");
  const [endDate,   setEnd]     = useState("2026-04-03");
  const [leaveType, setType]    = useState("annual");
  const [submitted, setSubmitted] = useState(false);

  const days      = workingDays(startDate, endDate);
  const available = BALANCE[leaveType] ?? 18;
  const remaining = available - days;
  const ok        = remaining >= 0;

  if (submitted) return (
    <div style={{ maxWidth: 480, margin: "60px auto" }}>
      <Card style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>Demande soumise !</div>
        <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 24 }}>
          Votre manager <strong>Claire Dumont</strong> sera notifié et devra valider sous 48h.
        </div>
        <Badge type="pending">En attente de validation</Badge>
        <div style={{ marginTop: 24 }}>
          <Btn onClick={() => setSubmitted(false)} variant="ghost">Soumettre une autre demande</Btn>
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Nouvelle demande de congé</div>
          <div className="page-subtitle">Thomas Moreau · Service Développement</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, alignItems: "start" }}>
        {/* ── Left: form ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SectionTitle>Type et période</SectionTitle>
            <Select label="Type de congé" value={leaveType} onChange={e => setType(e.target.value)}>
              <option value="annual">Congé annuel</option>
              <option value="rtt">RTT</option>
              <option value="sick">Congé maladie</option>
              <option value="unpaid">Congé sans solde</option>
              <option value="family">Événement familial</option>
            </Select>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Date de début" type="date" value={startDate} onChange={e => setStart(e.target.value)} />
              <Input label="Date de fin"   type="date" value={endDate}   onChange={e => setEnd(e.target.value)} />
            </div>

            {/* Auto-computed days */}
            <div style={{
              background: "var(--accent-light)", borderRadius: "var(--radius)",
              padding: 12, display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 14,
            }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--accent)" }}>Jours ouvrés demandés</div>
                <div style={{ fontSize: 11, color: "var(--accent-mid)" }}>Calculé automatiquement</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 500, color: "var(--accent)" }}>
                {days} <span style={{ fontSize: 12 }}>jours</span>
              </div>
            </div>

            {/* Balance alert */}
            <div style={{
              borderRadius: "var(--radius)", padding: "10px 12px", fontSize: 12, marginBottom: 14,
              display: "flex", gap: 8, alignItems: "flex-start",
              background: ok ? "var(--success-bg)" : "var(--warn-bg)",
              color:      ok ? "var(--success)"    : "var(--warn)",
            }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%",
                background: ok ? "var(--success)" : "var(--warn)",
                color: "#fff", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0, marginTop: 1,
              }}>{ok ? "✓" : "!"}</div>
              {ok
                ? `Solde suffisant — il vous restera ${remaining} jours après cette demande.`
                : `Solde insuffisant — il vous manque ${Math.abs(remaining)} jour(s). Modifiez les dates.`
              }
            </div>

            {/* Motif */}
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text2)", marginBottom: 5, fontWeight: 500 }}>Motif (facultatif)</label>
              <textarea style={{
                width: "100%", padding: "9px 12px",
                border: "0.5px solid var(--border)", borderRadius: "var(--radius)",
                fontSize: 13, minHeight: 70, resize: "vertical", outline: "none",
                fontFamily: "var(--font)", background: "var(--surface)", color: "var(--text)",
              }} placeholder="Ex : vacances en famille, repos..." />
            </div>
          </Card>

          <Card>
            <SectionTitle>Pièce jointe</SectionTitle>
            <div style={{
              border: "0.5px dashed var(--border)", borderRadius: "var(--radius)",
              padding: 20, textAlign: "center", color: "var(--text3)", fontSize: 12, cursor: "pointer",
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>+</div>
              Déposer un justificatif (PDF, JPG) — facultatif pour ce type
            </div>
          </Card>
        </div>

        {/* ── Right: balance + actions ── */}
        <div>
          <Card style={{ marginBottom: 14 }}>
            <SectionTitle>Mon solde actuel</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
              <DonutRing value={BALANCE.annual} total={25} color="var(--accent)" />
            </div>
            {[
              ["Congé annuel", BALANCE.annual, 25, "var(--accent)"],
              ["RTT",          BALANCE.rtt,    10, "var(--info)"],
              ["Récupération", BALANCE.recovery, 3, "var(--success)"],
            ].map(([name, val, total, color]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "0.5px solid var(--border2)" }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>{name}</div>
                  <div style={{ height: 4, background: "var(--surface2)", borderRadius: 2, marginTop: 4, width: 100, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${val / total * 100}%`, background: color, borderRadius: 2 }} />
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{val} j</div>
              </div>
            ))}
          </Card>

          <Btn
            onClick={() => ok && setSubmitted(true)}
            style={{ width: "100%", padding: 11, fontSize: 13, opacity: ok ? 1 : 0.5 }}
          >
            Soumettre la demande
          </Btn>
          <Btn variant="secondary" style={{ width: "100%", padding: 10, marginTop: 8 }}>
            Annuler
          </Btn>

          <div style={{ marginTop: 12, background: "var(--surface2)", borderRadius: "var(--radius)", padding: 10, fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>
            Votre manager <strong>Claire Dumont</strong> recevra une notification et devra valider votre demande sous 48h.
          </div>
        </div>
      </div>
    </div>
  );
}
