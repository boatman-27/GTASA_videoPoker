import { createRoot } from "react-dom/client";
import { CardProvider } from "./contexts/CardContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <CardProvider>
      <App />
    </CardProvider>
  </UserProvider>
);
