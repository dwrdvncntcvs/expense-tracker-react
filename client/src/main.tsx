import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
);
