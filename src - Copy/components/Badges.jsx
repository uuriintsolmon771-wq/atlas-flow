export function StatusBadge({ status }) {
  const cls = status.toLowerCase().replace(" ", "-");
  return <span className={`pill status ${cls}`}>● {status}</span>;
}

export function PriorityBadge({ priority }) {
  return <span className={`pill priority ${priority.toLowerCase()}`}>{priority}</span>;
}

const colors = ["#2563eb", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];
export function ProjectIcon({ name }) {
  const bg = colors[name.charCodeAt(0) % colors.length];
  return (
    <span className="proj-icon" style={{ background: bg }}>
      {name[0]}
    </span>
  );
}
