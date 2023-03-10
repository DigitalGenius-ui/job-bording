import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Context from "./components/Context/Context";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Context>
        <App />
      </Context>
    </QueryClientProvider>
  </React.StrictMode>
);
