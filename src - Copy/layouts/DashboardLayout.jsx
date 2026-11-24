import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFilter } from "../store/tasksSlice";
import { APP_NAME, APP_SUFFIX } from "../config";

const groups = [
  { label: "Dashboard", links: [
    { to: "/dashboard", text: "Overview" },
    { to: "/my-tasks", text: "My Tasks", badge: true },
    { to: "/activity", text: "Activity" },
  ]},
  { label: "Team", links: [{ to: "/users", text: "Users" }] },
];
const icons = {
  "/dashboard": "▣", "/my-tasks": "✔", "/activity": "↯", "/users": "☺",
  "/projects": "❖", "/tasks": "☰", "/calendar": "▦", "/analytics": "◔",
  "/files": "▤", "/integrations": "⚡", "/settings": "⚙",
};
const plain = [
  { to: "/projects", text: "Projects" },
  { to: "/tasks", text: "Tasks" },
  { to: "/calendar", text: "Calendar" },
  { to: "/analytics", text: "Analytics" },
  { to: "/files", text: "Files" },
  { to: "/integrations", text: "Integrations" },
  { to: "/settings", text: "Settings" },
];

export default function Layout() {
  const count = useSelector((s) => s.tasks.items.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const { name, role, theme, compact } = useSelector((s) => s.settings);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.compact = compact ? "1" : "0";
  }, [theme, compact]);

  const doSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({ key: "search", value: q }));
    navigate("/my-tasks");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <NavLink to="/dashboard" className="logo">◍ {APP_NAME} <small>{APP_SUFFIX}</small></NavLink>
        {groups.map((g) => (
          <div key={g.label} className="nav-group">
            <div className="nav-title">{g.label}</div>
            {g.links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                <span><i className="ni">{icons[l.to]}</i>{l.text}</span>
                {l.badge && <span className="badge">{count}</span>}
              </NavLink>
            ))}
          </div>
        ))}
        {plain.map((p) => (
          <NavLink key={p.to} to={p.to} className={({ isActive }) => "nav-link top" + (isActive ? " active" : "")}>
            <span><i className="ni">{icons[p.to]}</i>{p.text}</span>
          </NavLink>
        ))}
      </aside>

      <div className="content">
        <header className="topbar">
          <form onSubmit={doSearch}>
            <input className="search" placeholder="Search (Enter)" value={q} onChange={(e) => setQ(e.target.value)} />
          </form>
          <div className="topbar-right">
            <button className="btn-outline" onClick={() => navigate("/my-tasks", { state: { create: true } })}>
              + Create New
            </button>
            <button className="user user-btn" onClick={() => navigate("/users")}>
              <div className="avatar">{name[0]}</div>
              <div>
                <div className="user-name">{name}</div>
                <div className="user-role">{role}</div>
              </div>
            </button>
          </div>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer">08 / LAYOUT</footer>
      </div>
    </div>
  );
}
