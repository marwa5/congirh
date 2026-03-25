import { useState, useMemo } from "react";
import { Sidebar } from "./components";

// Views
import LoginView       from "./views/LoginView";
import DashboardView   from "./views/DashboardView";
import LeaveRequestView from "./views/LeaveRequestView";
import ProfileView     from "./views/ProfileView";
import ValidationView  from "./views/ValidationView";
import AbsencesView    from "./views/AbsencesView";
import CalendarView    from "./views/CalendarView";
import ReportsView     from "./views/ReportsView";
import AdminView       from "./views/AdminView";

import "./styles/App.css";

const VIEWS = {
  login:      LoginView,
  dashboard:  DashboardView,
  request:    LeaveRequestView,
  profile:    ProfileView,
  validation: ValidationView,
  absences:   AbsencesView,
  calendar:   CalendarView,
  reports:    ReportsView,
  admin:      AdminView,
};

export default function App() {
  const [view,     setView]     = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    setView("dashboard");
  };

  const handleNav = (id) => {
    if (id === "login") {
      setLoggedIn(false);
      setView("login");
    } else {
      setView(id);
    }
  };

  const ViewComponent = useMemo(() => VIEWS[view] ?? DashboardView, [view]);

  // ── Login screen (full page) ──────────────────────────────────────────────
  if (!loggedIn || view === "login") {
    return (
      <div className="app-login">
        <LoginView onLogin={handleLogin} />
      </div>
    );
  }

  // ── Authenticated shell ───────────────────────────────────────────────────
  return (
    <div className="app-shell">
      <Sidebar current={view} onNav={handleNav} />
      <main className="app-main">
        <ViewComponent />
      </main>
    </div>
  );
}
