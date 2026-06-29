import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { LayoutProvider } from "./context/LayoutContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

      <LayoutProvider>

          <Toaster
            position="top-right"

            toastOptions={{
              style: {
                borderRadius: "18px",
                padding: "16px",
              },
            }}
          />

          <>
            <App />
          </>

      </LayoutProvider>

  </React.StrictMode>

);