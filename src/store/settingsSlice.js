import { createSlice } from "@reduxjs/toolkit";

export const INTEGRATIONS = [
  { id: "slack", name: "Slack", desc: "Task мэдэгдлийг channel руу илгээнэ", icon: "#" },
  { id: "github", name: "GitHub", desc: "Issue болон PR-г task-тай холбоно", icon: "⌥" },
  { id: "drive", name: "Google Drive", desc: "Файлуудыг project-д хавсаргана", icon: "▲" },
  { id: "calendar", name: "Google Calendar", desc: "Due date-г календарьт синк хийнэ", icon: "▦" },
  { id: "figma", name: "Figma", desc: "Дизайны файлыг task дээр харуулна", icon: "◆" },
  { id: "email", name: "Email", desc: "Өдөр бүрийн тайланг имэйлээр авна", icon: "✉" },
];

const saved = (() => {
  try { return JSON.parse(localStorage.getItem("atlas-settings")) || {}; } catch { return {}; }
})();

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    name: "Reyhan Adinata",
    role: "Lead Product",
    theme: "light",
    notifications: true,
    compact: false,
    connected: {},
    ...saved,
  },
  reducers: {
    updateSettings(state, { payload }) { Object.assign(state, payload); },
    toggleIntegration(state, { payload }) {
      state.connected[payload] = !state.connected[payload];
    },
  },
});

export const { updateSettings, toggleIntegration } = settingsSlice.actions;
export default settingsSlice.reducer;
