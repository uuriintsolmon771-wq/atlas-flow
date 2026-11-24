import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { StatusBadge, PriorityBadge } from "../components/Badges";

export default function Task() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((s) => s.tasks.items.find((t) => t.id === Number(id)));

  if (!task) return <p>Task олдсонгүй. <button className="btn-outline" onClick={() => navigate("/my-tasks")}>Буцах</button></p>;

  return (
    <div>
      <button className="btn-outline" onClick={() => navigate(-1)}>← Буцах</button>
      <h1>{task.title}</h1>
      <div className="card detail">
        <p><b>Project:</b> {task.project}</p>
        <p><b>Due date:</b> {task.due}</p>
        <p><b>Status:</b> <StatusBadge status={task.status} /></p>
        <p><b>Priority:</b> <PriorityBadge priority={task.priority} /></p>
      </div>
    </div>
  );
}
