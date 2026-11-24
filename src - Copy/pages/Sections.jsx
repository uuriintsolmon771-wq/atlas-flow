import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setFilter } from "../store/tasksSlice";
import { ProjectIcon } from "../components/Badges";

const STATUSES = ["To Do", "In Progress", "Complete", "Overdue"];

export function Projects() {
  const items = useSelector((s) => s.tasks.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const names = [...new Set(items.map((t) => t.project))];
  const open = (p) => {
    dispatch(setFilter({ key: "project", value: p }));
    navigate("/my-tasks");
  };
  return (
    <div>
      <h1>Projects</h1>
      <div className="grid">
        {names.map((p) => (
          <button key={p} className="card tile" onClick={() => open(p)}>
            <ProjectIcon name={p} /> <b>{p}</b>
            <div className="muted-text">{items.filter((t) => t.project === p).length} task</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Tasks() {
  const items = useSelector((s) => s.tasks.items);
  return (
    <div>
      <h1>Tasks</h1>
      <div className="card detail">
        {items.map((t) => (
          <p key={t.id}><Link to={`/task/${t.id}`}>{t.title}</Link> — {t.status}</p>
        ))}
      </div>
    </div>
  );
}

export function Calendar() {
  const items = useSelector((s) => s.tasks.items);
  const byDate = {};
  items.forEach((t) => (byDate[t.due] = [...(byDate[t.due] || []), t]));
  return (
    <div>
      <h1>Calendar</h1>
      <div className="card detail">
        {Object.entries(byDate).map(([d, ts]) => (
          <p key={d}><b>{d}</b>: {ts.map((t) => t.title).join(", ")}</p>
        ))}
      </div>
    </div>
  );
}

export function Analytics() {
  const items = useSelector((s) => s.tasks.items);
  return (
    <div>
      <h1>Analytics</h1>
      <div className="card detail">
        {STATUSES.map((s) => {
          const n = items.filter((t) => t.status === s).length;
          return (
            <div key={s} className="bar-row">
              <span>{s}</span>
              <div className="bar"><div style={{ width: `${(n / items.length) * 100}%` }} /></div>
              <b>{n}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Files() {
  return <div><h1>Files</h1><div className="card detail"><p>Файл байхгүй байна.</p></div></div>;
}
