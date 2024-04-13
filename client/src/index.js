import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./modules/note/App";
import reportWebVitals from "./reportWebVitals";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { listen } from './shm-core';

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootApp = () => {
  const listen_core = async () => {
    listen();
  }
  useEffect(() => {
    listen_core()
  }, [])

  return (
    <React.StrictMode>
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    </React.StrictMode>
  );
};

root.render(<RootApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
