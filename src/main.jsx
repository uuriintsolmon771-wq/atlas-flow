import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "./store";
import App from "./App";
import "./index.css";
import { APP_NAME, APP_SUFFIX } from "./config";

document.title = `${APP_NAME} ${APP_SUFFIX}`;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
