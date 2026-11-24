import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
  { id: 1, title: "Design System Audit", project: "Amazon Dashboard", due: "10 Jan 2026", status: "Complete", priority: "High" },
  { id: 2, title: "Landing Page Copywriting", project: "Microsoft", due: "12 Jan 2026", status: "Complete", priority: "High" },
  { id: 3, title: "Mobile App Redesign", project: "Apple", due: "14 Jan 2026", status: "Complete", priority: "High" },
  { id: 4, title: "Key Metrics Layout", project: "Facebook Dashboard", due: "16 Jan 2026", status: "Overdue", priority: "Low" },
  { id: 5, title: "Wireframe v2 Upload", project: "Netflix", due: "17 Jan 2026", status: "In Progress", priority: "Low" },
  { id: 6, title: "QA Testing", project: "Nvidia", due: "17 Jan 2026", status: "In Progress", priority: "Low" },
  { id: 7, title: "Prototype Review", project: "Behance", due: "18 Jan 2026", status: "In Progress", priority: "Medium" },
  { id: 8, title: "Copywriting Review", project: "Google Dashboard", due: "24 Jan 2026", status: "To Do", priority: "Medium" },
  { id: 9, title: "UX Audit", project: "Grab Map App", due: "25 Jan 2026", status: "To Do", priority: "Medium" },
  { id: 10, title: "Review Landing Page", project: "Lego", due: "04 Jan 2026", status: "Complete", priority: "Medium" },
  { id: 11, title: "Icon Set Export", project: "Spotify", due: "26 Jan 2026", status: "To Do", priority: "Low" },
  { id: 12, title: "Onboarding Flow", project: "Airbnb", due: "27 Jan 2026", status: "In Progress", priority: "High" },
  { id: 13, title: "Accessibility Check", project: "Behance", due: "28 Jan 2026", status: "To Do", priority: "Medium" },
  { id: 14, title: "Handoff Notes", project: "Nvidia", due: "30 Jan 2026", status: "To Do", priority: "Low" },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: initialTasks,
    filters: { project: "All", status: "All", priority: "All", search: "" },
    page: 1,
    pageSize: 10,
    nextId: 15,
  },
  reducers: {
    setFilter(state, { payload }) {
      state.filters[payload.key] = payload.value;
      state.page = 1;
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
    addTask(state, { payload }) {
      state.items.unshift({ id: state.nextId++, ...payload });
    },
    removeTask(state, { payload }) {
      state.items = state.items.filter((t) => t.id !== payload);
    },
  },
});

export const { setFilter, setPage, addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
