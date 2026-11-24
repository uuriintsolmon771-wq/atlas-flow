import { useDispatch, useSelector } from "react-redux";
import { INTEGRATIONS, toggleIntegration } from "../store/settingsSlice";

export default function Integrations() {
  const dispatch = useDispatch();
  const connected = useSelector((s) => s.settings.connected);
  const n = INTEGRATIONS.filter((i) => connected[i.id]).length;

  return (
    <div>
      <div className="page-head">
        <h1>Integrations</h1>
        <span className="pill status in-progress">{n} / {INTEGRATIONS.length} холбогдсон</span>
      </div>
      <div className="grid">
        {INTEGRATIONS.map((i) => {
          const on = !!connected[i.id];
          return (
            <div key={i.id} className="card tile int-card">
              <div className="int-icon">{i.icon}</div>
              <b>{i.name}</b>
              <div className="muted-text">{i.desc}</div>
              <div className="int-foot">
                <span className={"dot " + (on ? "on" : "")}>{on ? "Холбогдсон" : "Холбоогүй"}</span>
                <button className={on ? "btn-outline" : "btn-primary small"} onClick={() => dispatch(toggleIntegration(i.id))}>
                  {on ? "Салгах" : "Холбох"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
