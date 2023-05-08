import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import Context from "./Context/Context";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import PostJobContext from "./Context/PostJobContext";

const queryClient = new QueryClient({ refetchOnWindowFocus: true });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Context>
          <PostJobContext>
            <App />
          </PostJobContext>
        </Context>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
