import { CreateExpense } from "@components/Expense";
import { MainLayout, Private, Public, SettingsLayout, Toast } from "@layouts";
import { ForgotPassword, Home, Profile, SignIn, SignUp } from "@pages";
import { CategoriesSettings, UserSettings } from "@pages/Settings";
import { useIsAuthenticatedQuery } from "@store/queries/user";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
    const { isLoading } = useIsAuthenticatedQuery();

    const { pathname } = useLocation();

    const shouldDisplayCreateExpense = ["/", "/user"];

    return (
        <MainLayout>
            <Routes>
                <Route element={<Public loading={isLoading} />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Route>
                <Route element={<Private loading={isLoading} />}>
                    <Route path="/" index element={<Home />}></Route>
                    <Route path="/settings/" element={<SettingsLayout />}>
                        <Route path="user" element={<UserSettings />} />
                        <Route path="privacy" element={<UserSettings />} />
                        <Route
                            path="categories"
                            element={<CategoriesSettings />}
                        />
                    </Route>
                    <Route path="/:id" element={<Profile />} />
                </Route>
            </Routes>
            {shouldDisplayCreateExpense.includes(pathname) && <CreateExpense />}
            <Toast />
        </MainLayout>
    );
}

export default App;
