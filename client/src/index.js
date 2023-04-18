import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import Context from "./Context/Context";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({ refetchOnWindowFocus: true });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Context>
          <App />
        </Context>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
