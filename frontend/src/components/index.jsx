export const Badge = ({ type, children }) => {
  const styles = {
    pending: { background: "var(--warn-bg)", color: "var(--warn)" },
    approved: { background: "var(--success-bg)", color: "var(--success)" },
    refused: { background: "var(--danger-bg)", color: "var(--danger)" },
    info: { background: "var(--info-bg)", color: "var(--info)" },
    admin: { background: "var(--accent-light)", color: "var(--accent)" },
    rh: { background: "var(--info-bg)", color: "var(--info)" },
    manager: { background: "var(--success-bg)", color: "var(--success)" },
    employee: { background: "var(--surface2)", color: "var(--text2)" },
    active: { background: "var(--success-bg)", color: "var(--success)" },
    inactive: { background: "var(--danger-bg)", color: "var(--danger)" },
  };
  return (
    <span style={{
      fontSize: 10, padding: "3px 9px", borderRadius: 5, fontWeight: 500,
      ...styles[type]
    }}>{children}</span>
  );
};

export const Avatar = ({ initials, color = "accent", size = 32 }) => {
  const colors = {
    accent: { bg: "var(--accent-light)", fg: "var(--accent)" },
    success: { bg: "var(--success-bg)", fg: "var(--success)" },
    warn: { bg: "var(--warn-bg)", fg: "var(--warn)" },
    danger: { bg: "var(--danger-bg)", fg: "var(--danger)" },
    info: { bg: "var(--info-bg)", fg: "var(--info)" },
  };
  const c = colors[color] || colors.accent;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: c.bg, color: c.fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.3, fontWeight: 500, flexShrink: 0,
    }}>{initials}</div>
  );
};

export const Card = ({ children, style = {} }) => (
  <div style={{
    background: "var(--surface)", border: "0.5px solid var(--border)",
    borderRadius: "var(--radius-lg)", padding: 18, ...style
  }}>{children}</div>
);

export const SectionTitle = ({ children }) => (
  <div style={{
    fontSize: 11, fontWeight: 500, color: "var(--text3)",
    textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12
  }}>{children}</div>
);

export const Btn = ({ onClick, variant = "primary", children, style = {} }) => {
  const variants = {
    primary: { background: "var(--accent)", color: "#fff", border: "none" },
    secondary: { background: "var(--surface2)", color: "var(--text2)", border: "0.5px solid var(--border)" },
    success: { background: "var(--success-bg)", color: "var(--success)", border: "0.5px solid rgba(59,109,17,0.2)" },
    danger: { background: "var(--danger-bg)", color: "var(--danger)", border: "0.5px solid rgba(163,45,45,0.2)" },
    ghost: { background: "transparent", color: "var(--text2)", border: "0.5px solid var(--border)" },
  };
  return (
    <button onClick={onClick} style={{
      ...variants[variant], borderRadius: "var(--radius)",
      padding: "8px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer",
      fontFamily: "var(--font)", ...style
    }}>{children}</button>
  );
};

export const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ display: "block", fontSize: 12, color: "var(--text2)", marginBottom: 5, fontWeight: 500 }}>{label}</label>}
    <input style={{
      width: "100%", padding: "9px 12px",
      border: "0.5px solid var(--border)", borderRadius: "var(--radius)",
      background: "var(--surface)", color: "var(--text)", fontSize: 13,
      outline: "none", fontFamily: "var(--font)",
    }} {...props} />
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ display: "block", fontSize: 12, color: "var(--text2)", marginBottom: 5, fontWeight: 500 }}>{label}</label>}
    <select style={{
      width: "100%", padding: "9px 12px",
      border: "0.5px solid var(--border)", borderRadius: "var(--radius)",
      background: "var(--surface)", color: "var(--text)", fontSize: 13,
      outline: "none", fontFamily: "var(--font)",
    }} {...props}>{children}</select>
  </div>
);

export const Sidebar = ({ current, onNav }) => {
  const NAV_ITEMS = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "request", label: "Nouvelle demande" },
    { id: "profile", label: "Mon profil" },
    { id: "validation", label: "Validation" },
    { id: "absences", label: "Absences" },
    { id: "calendar", label: "Calendrier" },
    { id: "reports", label: "Rapports" },
    { id: "admin", label: "Admin" },
    { id: "login", label: "Déconnexion" },
  ];
  return (
    <nav style={{
      width: 210, background: "var(--surface)", borderRight: "0.5px solid var(--border)",
      display: "flex", flexDirection: "column", gap: 2, padding: "20px 0", flexShrink: 0,
    }}>
      <div style={{ padding: "0 16px 18px", borderBottom: "0.5px solid var(--border2)", marginBottom: 6 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--accent)" }}>CongiRH</div>
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>Gestion des congés</div>
      </div>
      {NAV_ITEMS.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 16px", fontSize: 13, border: "none", textAlign: "left",
          background: current === item.id ? "var(--accent-light)" : "transparent",
          color: current === item.id ? "var(--accent)" : "var(--text2)",
          fontWeight: current === item.id ? 500 : 400, cursor: "pointer",
          fontFamily: "var(--font)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: current === item.id ? 1 : 0.4 }} />
          {item.label}
        </button>
      ))}
    </nav>
  );
};
