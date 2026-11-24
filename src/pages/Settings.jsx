import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../store/settingsSlice";

function Switch({ checked, onChange, label, hint }) {
  return (
    <label className="switch-row">
      <div><b>{label}</b><div className="muted-text">{hint}</div></div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

export default function Settings() {
  const dispatch = useDispatch();
  const s = useSelector((st) => st.settings);
  const [name, setName] = useState(s.name);
  const [role, setRole] = useState(s.role);
  const [saved, setSaved] = useState(false);

  const saveProfile = (e) => {
    e.preventDefault();
    dispatch(updateSettings({ name: name.trim() || s.name, role: role.trim() || s.role }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div>
      <h1>Settings</h1>

      <form className="card detail" onSubmit={saveProfile}>
        <h3>Профайл</h3>
        <div className="form-grid">
          <label>Нэр<input value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label>Албан тушаал<input value={role} onChange={(e) => setRole(e.target.value)} /></label>
        </div>
        <button className="btn-primary">Хадгалах</button>
        {saved && <span className="saved">✓ Хадгалагдлаа</span>}
      </form>

      <div className="card detail">
        <h3>Харагдац</h3>
        <Switch label="Dark mode" hint="Харанхуй загвар ашиглах" checked={s.theme === "dark"}
          onChange={(v) => dispatch(updateSettings({ theme: v ? "dark" : "light" }))} />
        <Switch label="Нягт хүснэгт" hint="Хүснэгтийн мөрийг нарийсгах" checked={s.compact}
          onChange={(v) => dispatch(updateSettings({ compact: v }))} />
      </div>

      <div className="card detail">
        <h3>Мэдэгдэл</h3>
        <Switch label="Мэдэгдэл авах" hint="Шинэ task болон due date-ийн сануулга" checked={s.notifications}
          onChange={(v) => dispatch(updateSettings({ notifications: v }))} />
      </div>
    </div>
  );
}
