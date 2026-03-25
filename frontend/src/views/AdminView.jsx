import { useState } from "react";
import { Avatar, Badge, MetricCard, Btn } from "../components";

const USERS = [
  { initials:"TM", color:"accent",  name:"Thomas Moreau",  email:"t.moreau@entreprise.fr",  role:"employee", dept:"Développement",     active:true  },
  { initials:"CD", color:"success", name:"Claire Dumont",  email:"c.dumont@entreprise.fr",  role:"manager",  dept:"Développement",     active:true  },
  { initials:"SR", color:"info",    name:"Sophie RH",      email:"s.rh@entreprise.fr",      role:"rh",       dept:"Ressources Humaines",active:true  },
  { initials:"AD", color:"accent",  name:"Admin Système",  email:"admin@entreprise.fr",      role:"admin",    dept:"—",                 active:true  },
  { initials:"PM", color:"danger",  name:"Paul Mercier",   email:"p.mercier@entreprise.fr", role:"employee", dept:"Commercial",         active:false },
  { initials:"LB", color:"warn",    name:"Léa Bernard",    email:"l.bernard@entreprise.fr", role:"employee", dept:"Développement",     active:true  },
];

const ROLE_LABELS  = { employee:"EMPLOYEE", manager:"MANAGER", rh:"RH", admin:"ADMIN" };
const ROLE_COUNTS  = { employee:42, manager:8, rh:3, admin:2 };
const ROLE_DESCS   = {
  employee: "Soumet et suit ses propres congés",
  manager:  "Valide les demandes de son équipe",
  rh:       "Gère employés, soldes et rapports",
  admin:    "Accès total · configuration système",
};

const PERMISSIONS = [
  { label: "Voir son solde",        roles: ["employee","manager","rh","admin"] },
  { label: "Soumettre une demande", roles: ["employee","manager","rh","admin"] },
  { label: "Valider des demandes",  roles: ["manager","admin"] },
  { label: "Gérer les employés",    roles: ["rh","admin"] },
  { label: "Accès rapports",        roles: ["rh","admin"] },
  { label: "Configuration système", roles: ["admin"] },
];

const Toggle = ({ on }) => (
  <div style={{ width: 32, height: 18, borderRadius: 9, background: on ? "var(--success)" : "var(--border)", position: "relative", flexShrink: 0 }}>
    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, [on ? "right" : "left"]: 2, transition: "left 0.2s, right 0.2s" }} />
  </div>
);

export default function AdminView() {
  const [selectedIdx, setSelected] = useState(0);
  const u = USERS[selectedIdx];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Gestion des utilisateurs & rôles</div>
          <div className="page-subtitle">Administration système</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost">Exporter</Btn>
          <Btn>+ Nouvel utilisateur</Btn>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid-4" style={{ marginBottom: 14 }}>
        <MetricCard label="Employés" value="42" />
        <MetricCard label="Managers"  value="8"  color="var(--success)" />
        <MetricCard label="Équipe RH" value="3"  color="var(--info)" />
        <MetricCard label="Admins"    value="2"  color="var(--accent)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14, alignItems: "start" }}>
        {/* ── Users table ── */}
        <div>
          <div className="toolbar">
            <input className="toolbar-search" placeholder="Rechercher un utilisateur..." />
            <select className="toolbar-select"><option>Tous les rôles</option>{Object.values(ROLE_LABELS).map(l => <option key={l}>{l}</option>)}</select>
            <select className="toolbar-select"><option>Tous les services</option></select>
          </div>

          <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <table className="rh-table">
              <thead>
                <tr>
                  {["Utilisateur","Rôle","Service","Statut","Actions"].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {USERS.map((u, i) => (
                  <tr key={i} onClick={() => setSelected(i)} style={{ cursor: "pointer", background: selectedIdx === i ? "var(--accent-light)" : "transparent" }}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar initials={u.initials} color={u.color} size={26} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>{u.name}</div>
                          <div style={{ fontSize: 10, color: "var(--text3)" }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><Badge type={u.role}>{ROLE_LABELS[u.role]}</Badge></td>
                    <td>{u.dept}</td>
                    <td><Badge type={u.active ? "active" : "inactive"}>{u.active ? "Actif" : "Inactif"}</Badge></td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: "0.5px solid var(--border)", background: "transparent", color: "var(--text2)", cursor: "pointer" }}>Modifier</button>
                        <button style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: "0.5px solid rgba(163,45,45,0.2)", background: "transparent", color: "var(--danger)", cursor: "pointer" }}>
                          {u.active ? "Désactiver" : "Réactiver"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 11, color: "var(--text3)", textAlign: "right", marginTop: 8 }}>55 utilisateurs · Page 1/5</div>
        </div>

        {/* ── Detail panel ── */}
        <div>
          {/* User detail */}
          <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 18, marginBottom: 12 }}>
            <div style={{ textAlign: "center", paddingBottom: 14, borderBottom: "0.5px solid var(--border2)", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <Avatar initials={u.initials} color={u.color} size={52} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{u.email}</div>
              <div style={{ marginTop: 10 }}>
                <select style={{ fontSize: 11, padding: "4px 8px", border: "0.5px solid var(--border)", borderRadius: 6, fontFamily: "var(--font)", color: "var(--accent)", background: "var(--accent-light)", outline: "none" }}>
                  {Object.entries(ROLE_LABELS).map(([k, v]) => (
                    <option key={k} selected={u.role === k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 500, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Permissions</div>
            {PERMISSIONS.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: i < PERMISSIONS.length - 1 ? "0.5px solid var(--border2)" : "none", fontSize: 12 }}>
                <div>
                  <div style={{ color: "var(--text2)" }}>{p.label}</div>
                  {!p.roles.includes(u.role) && <div style={{ fontSize: 10, color: "var(--text3)" }}>Non disponible pour {ROLE_LABELS[u.role]}</div>}
                </div>
                <Toggle on={p.roles.includes(u.role)} />
              </div>
            ))}
            <Btn style={{ width: "100%", padding: 9, marginTop: 14, fontSize: 12 }}>Enregistrer les modifications</Btn>
          </div>

          {/* Roles reference */}
          <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Rôles disponibles</div>
            {Object.entries(ROLE_DESCS).map(([key, desc]) => (
              <div key={key} style={{ border: `0.5px solid ${u.role === key ? "var(--accent)" : "var(--border)"}`, borderRadius: "var(--radius)", padding: 10, marginBottom: 6, background: u.role === key ? "var(--accent-light)" : "transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{ROLE_LABELS[key]}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "var(--accent)" }}>{ROLE_COUNTS[key]} utilisateurs</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
