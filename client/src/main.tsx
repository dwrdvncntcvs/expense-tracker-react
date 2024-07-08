import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "./contexts/Toast.tsx";
import UserProvider from "./contexts/User.tsx";
import ModalProvider from "./contexts/Modal.tsx";
import SettingsProvider from "./contexts/Settings.tsx";

const client = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <BrowserRouter>
            <ToastProvider>
                <ModalProvider>
                    <UserProvider>
                        <SettingsProvider>
                            <App />
                        </SettingsProvider>
                    </UserProvider>
                </ModalProvider>
            </ToastProvider>
        </BrowserRouter>
    </QueryClientProvider>
);
