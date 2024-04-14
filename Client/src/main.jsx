import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import { AuthContextProvider } from "./Context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
