import React from "react"; // Import React
import ReactDOM from "react-dom/client"; // Ensure React 18+
import App from "./App"; // Import your App component
import "./index.css"; // Import global styles

// Ensure root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found! Make sure your HTML has <div id='root'></div>");
}

// Create and render React root
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
