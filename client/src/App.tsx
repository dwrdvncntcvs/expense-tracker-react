import { CreateExpense } from "@components/Expense/";
import { MainLayout, Private, Public, SettingsLayout, Toast } from "@layouts";
import {
    ExpenseAnalytics,
    ExpenseMonth,
    ExpenseYearlyAnalytics,
    ForgotPassword,
    Home,
    Profile,
    SignIn,
    SignUp,
} from "@pages";
import {
    CategoriesSettings,
    PrivacySettings,
    UserSettings,
} from "@pages/Settings";
import { useGetCategoriesQuery } from "@store/queries/categories";
import { useIsAuthenticatedQuery } from "@store/queries/user";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
    const { isLoading } = useIsAuthenticatedQuery();
    useGetCategoriesQuery();

    const { pathname } = useLocation();

    const shouldNotDisplayCreateExpense = [
        "/settings/user",
        "/settings/privacy",
        "/settings/categories",
        "/sign-in",
        "/sign-up",
    ];

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
                    <Route path="/" element={<Home />}>
                        <Route
                            path=":year/analytics"
                            element={<ExpenseYearlyAnalytics />}
                        />
                    </Route>
                    <Route path="/settings/" element={<SettingsLayout />}>
                        <Route path="user" element={<UserSettings />} />
                        <Route path="privacy" element={<PrivacySettings />} />
                        <Route
                            path="categories"
                            element={<CategoriesSettings />}
                        />
                    </Route>
                    <Route path="/:month/:year/" element={<ExpenseMonth />}>
                        <Route
                            path="analytics"
                            element={<ExpenseAnalytics />}
                        />
                    </Route>
                    <Route path="/user/:year?" element={<Profile />} />
                </Route>
            </Routes>
            {!shouldNotDisplayCreateExpense.includes(pathname) && (
                <CreateExpense />
            )}
            <Toast />
        </MainLayout>
    );
}

export default App;
