import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setFilter } from "../store/tasksSlice";
import { StatusBadge, PriorityBadge, ProjectIcon } from "../components/Badges";

const STATUSES = [
  { name: "To Do", color: "#94a3b8", icon: "☰" },
  { name: "In Progress", color: "#3b82f6", icon: "◔" },
  { name: "Complete", color: "#10b981", icon: "✓" },
  { name: "Overdue", color: "#ef4444", icon: "!" },
];

export default function Overview() {
  const items = useSelector((s) => s.tasks.items);
  const name = useSelector((s) => s.settings.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.length || 1;
  const counts = STATUSES.map((s) => ({ ...s, n: items.filter((t) => t.status === s.name).length }));
  const done = counts.find((c) => c.name === "Complete").n;
  const pct = Math.round((done / total) * 100);

  let acc = 0;
  const stops = counts.map((c) => {
    const from = (acc / total) * 100;
    acc += c.n;
    return `${c.color} ${from}% ${(acc / total) * 100}%`;
  });

  const goStatus = (s) => {
    dispatch(setFilter({ key: "status", value: s }));
    navigate("/my-tasks");
  };

  const priorities = ["High", "Medium", "Low"].map((p) => ({ p, n: items.filter((t) => t.priority === p).length }));
  const upcoming = items.filter((t) => t.status !== "Complete").slice(0, 5);
  const overdue = items.filter((t) => t.status === "Overdue");

  return (
    <div className="overview">
      <div className="hero">
        <div>
          <h1>Сайн байна уу, {name.split(" ")[0]} 👋</h1>
          <p>Танд {items.length - done} дуусаагүй task байна. {overdue.length > 0 && `${overdue.length} нь хугацаа хэтэрсэн.`}</p>
        </div>
        <button className="btn-white" onClick={() => navigate("/my-tasks", { state: { create: true } })}>+ Шинэ task</button>
      </div>

      <div className="kpi-row">
        {counts.map((c) => (
          <button key={c.name} className="kpi" onClick={() => goStatus(c.name)}>
            <span className="kpi-icon" style={{ background: c.color + "22", color: c.color }}>{c.icon}</span>
            <div>
              <div className="kpi-n">{c.n}</div>
              <div className="kpi-l">{c.name}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="ov-grid">
        <div className="card ov-card">
          <h3>Явц</h3>
          <div className="donut-wrap">
            <div className="donut" style={{ background: `conic-gradient(${stops.join(", ")})` }}>
              <div className="donut-hole"><b>{pct}%</b><span>дууссан</span></div>
            </div>
            <ul className="legend">
              {counts.map((c) => (
                <li key={c.name}><i style={{ background: c.color }} />{c.name}<b>{c.n}</b></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card ov-card">
          <h3>Priority-аар</h3>
          {priorities.map(({ p, n }) => (
            <div key={p} className="bar-row">
              <span>{p}</span>
              <div className="bar"><div style={{ width: `${(n / total) * 100}%` }} /></div>
              <b>{n}</b>
            </div>
          ))}
          {overdue.length > 0 && (
            <div className="alert">
              ⚠ Хугацаа хэтэрсэн: <Link to={`/task/${overdue[0].id}`}>{overdue[0].title}</Link>
            </div>
          )}
        </div>

        <div className="card ov-card wide">
          <div className="card-head">
            <h3>Удахгүй хийх</h3>
            <Link to="/my-tasks">Бүгдийг харах →</Link>
          </div>
          {upcoming.map((t) => (
            <Link key={t.id} to={`/task/${t.id}`} className="up-row">
              <div className="up-main"><b>{t.title}</b><span><ProjectIcon name={t.project} /> {t.project}</span></div>
              <span className="up-due">{t.due}</span>
              <StatusBadge status={t.status} />
              <PriorityBadge priority={t.priority} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
