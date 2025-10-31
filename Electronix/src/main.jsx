import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { BreadcrumbProvider } from "./context/BreadcrumbContext.jsx"; // 👈 add this
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <BreadcrumbProvider>
        <App />
      </BreadcrumbProvider>
    </CartProvider>
  </BrowserRouter>
);
