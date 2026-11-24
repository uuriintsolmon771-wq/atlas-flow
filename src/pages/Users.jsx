const users = [
  { name: "Reyhan Adinata", role: "Lead Product" },
  { name: "Bat-Erdene", role: "Frontend Developer" },
  { name: "Sarnai", role: "UX Designer" },
];

export default function Users() {
  return (
    <div>
      <h1>Users</h1>
      <div className="card table-card">
        <table>
          <thead><tr><th>Нэр</th><th>Үүрэг</th></tr></thead>
          <tbody>
            {users.map((u) => <tr key={u.name}><td>{u.name}</td><td>{u.role}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
