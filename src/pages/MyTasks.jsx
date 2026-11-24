import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { setFilter, setPage, addTask, removeTask } from "../store/tasksSlice";
import { StatusBadge, PriorityBadge, ProjectIcon } from "../components/Badges";

const STATUSES = ["To Do", "In Progress", "Complete", "Overdue"];
const PRIORITIES = ["High", "Medium", "Low"];

export default function MyTasks() {
  const dispatch = useDispatch();
  const { items, filters, page, pageSize } = useSelector((s) => s.tasks);
  const location = useLocation();
  const [open, setOpen] = useState(!!location.state?.create);
  const [form, setForm] = useState({ title: "", project: "", due: "", priority: "Medium" });

  const projects = useMemo(() => [...new Set(items.map((t) => t.project))], [items]);

  const filtered = useMemo(
    () =>
      items.filter(
        (t) =>
          (filters.project === "All" || t.project === filters.project) &&
          (filters.status === "All" || t.status === filters.status) &&
          (filters.priority === "All" || t.priority === filters.priority) &&
          (t.title + t.project).toLowerCase().includes(filters.search.toLowerCase())
      ),
    [items, filters]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const count = (s) => items.filter((t) => t.status === s).length;

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    dispatch(addTask({ ...form, project: form.project || "General", due: form.due || "—", status: "To Do" }));
    setForm({ title: "", project: "", due: "", priority: "Medium" });
    setOpen(false);
  };

  return (
    <div>
      <div className="page-head">
        <h1>My Tasks</h1>
        <button className="btn-primary" onClick={() => setOpen((o) => !o)}>+ Create New Task</button>
      </div>

      {open && (
        <form className="card new-task" onSubmit={submit}>
          <input placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
          <input placeholder="Due date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <button className="btn-primary">Save</button>
        </form>
      )}

      <div className="filters">
        <select value={filters.project} onChange={(e) => dispatch(setFilter({ key: "project", value: e.target.value }))}>
          <option value="All">All Project</option>
          {projects.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={filters.status} onChange={(e) => dispatch(setFilter({ key: "status", value: e.target.value }))}>
          <option value="All">All Status</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={filters.priority} onChange={(e) => dispatch(setFilter({ key: "priority", value: e.target.value }))}>
          <option value="All">All Priority</option>
          {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <input placeholder="Search task / project" value={filters.search} onChange={(e) => dispatch(setFilter({ key: "search", value: e.target.value }))} />
      </div>

      <div className="stat-row">
        {STATUSES.map((s) => (
          <button key={s} className={"stat" + (filters.status === s ? " on" : "")}
            onClick={() => dispatch(setFilter({ key: "status", value: filters.status === s ? "All" : s }))}>
            <span>{s}</span><b>{count(s)}</b>
          </button>
        ))}
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr><th>Task Title</th><th>Project</th><th>Due Date</th><th>Status</th><th>Priority</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id}>
                <td><Link to={`/task/${t.id}`}>{t.title}</Link></td>
                <td><ProjectIcon name={t.project} /> {t.project}</td>
                <td>{t.due}</td>
                <td><StatusBadge status={t.status} /></td>
                <td><PriorityBadge priority={t.priority} /></td>
                <td><button className="icon-btn" title="Delete" onClick={() => dispatch(removeTask(t.id))}>✕</button></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="empty">Task олдсонгүй</td></tr>}
          </tbody>
        </table>

        <div className="table-foot">
          <div className="pager">
            <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>‹</button>
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} className={page === i + 1 ? "cur" : ""} onClick={() => dispatch(setPage(i + 1))}>{i + 1}</button>
            ))}
            <button disabled={page === pages} onClick={() => dispatch(setPage(page + 1))}>›</button>
          </div>
          <span className="total">Total {filtered.length} Data</span>
        </div>
      </div>
    </div>
  );
}
