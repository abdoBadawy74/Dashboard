import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./pages/website/Context/UserContext.js";
import App from "./App.js";

// New Way To Render The Project In React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
