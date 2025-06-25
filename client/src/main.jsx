import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import PostJobContext from "./Context/PostJobContext";
import Context from "./Context/Context";
import { queryClient } from "./constants/react-query.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Context>
          <PostJobContext>
            <App />
          </PostJobContext>
        </Context>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
