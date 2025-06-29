import { createRoot } from "react-dom/client";
import "./assets/css/styles.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AppRoutes from "./routes/Router";

createRoot(document.getElementById("root")!).render(<AppRoutes />);
