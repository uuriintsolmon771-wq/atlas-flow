import { Routes, Route, Navigate } from "react-router";
import Layout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";
import MyTasks from "./pages/MyTasks";
import Activity from "./pages/Activity";
import Users from "./pages/Users";
import Task from "./pages/Task";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import { Projects, Tasks, Calendar, Analytics, Files } from "./pages/Sections";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/my-tasks" replace />} />
        <Route path="dashboard" element={<Overview />} />
        <Route path="my-tasks" element={<MyTasks />} />
        <Route path="activity" element={<Activity />} />
        <Route path="users" element={<Users />} />
        <Route path="task/:id" element={<Task />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="files" element={<Files />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/my-tasks" replace />} />
      </Route>
    </Routes>
  );
}
