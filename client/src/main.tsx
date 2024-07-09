import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import SettingsProvider from "./contexts/Settings.tsx";
import UserProvider from "./contexts/User.tsx";
import "./index.css";
import store from "./store";

const client = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <UserProvider>
                    <SettingsProvider>
                        <App />
                    </SettingsProvider>
                </UserProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>
);
