import { Route, Routes, useLocation } from "react-router-dom";
import { CreateExpense } from "./components/Expense";
import ModalProvider from "./contexts/Modal";
import ToastProvider from "./contexts/Toast";
import UserProvider from "./contexts/User";
import { MainLayout, Private, Public, SettingsLayout, Toast } from "./layouts";
import { ForgotPassword, Home, Profile, SignIn, SignUp } from "./pages";
import { CategoriesSettings, UserSettings } from "./pages/Settings";

function App() {
    const { pathname } = useLocation();

    const shouldDisplayCreateExpense = ["/", "/user"];

    return (
        <ToastProvider>
            <ModalProvider>
                <UserProvider>
                    <MainLayout>
                        <Routes>
                            <Route element={<Public />}>
                                <Route path="/sign-in" element={<SignIn />} />
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route
                                    path="/forgot-password"
                                    element={<ForgotPassword />}
                                />
                            </Route>
                            <Route element={<Private />}>
                                <Route
                                    path="/"
                                    index
                                    element={<Home />}
                                ></Route>
                                <Route
                                    path="/settings/"
                                    element={<SettingsLayout />}
                                >
                                    <Route
                                        path="user"
                                        element={<UserSettings />}
                                    />
                                    <Route
                                        path="privacy"
                                        element={<UserSettings />}
                                    />
                                    <Route
                                        path="categories"
                                        element={<CategoriesSettings />}
                                    />
                                </Route>
                                <Route path="/:id" element={<Profile />} />
                            </Route>
                        </Routes>
                        {shouldDisplayCreateExpense.includes(pathname) && (
                            <CreateExpense />
                        )}
                    </MainLayout>
                </UserProvider>
            </ModalProvider>
            <Toast />
        </ToastProvider>
    );
}

export default App;
