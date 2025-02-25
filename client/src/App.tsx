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
    PreferenceSettings,
    PrivacySettings,
    TagsSettings,
    UserSettings,
} from "@pages/Settings";
import { useGetCategoriesQuery } from "@store/queries/categories";
import { useGetTagsQuery } from "@store/queries/tags";
import { useIsAuthenticatedQuery } from "@store/queries/user";
import { useUser } from "@store/slices/user";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
    const { isAuthenticated,  } = useUser();

    const { isLoading } = useIsAuthenticatedQuery();
    const { data } = useGetCategoriesQuery(undefined, {
        skip: !isAuthenticated,
    });
    useGetTagsQuery(undefined, { skip: !isAuthenticated });

    const { pathname } = useLocation();

    const shouldNotDisplayCreateExpense = [
        "/settings/user",
        "/settings/privacy",
        "/settings/categories",
        "/settings/preferences",
        "/settings/tags",
        "/sign-in",
        "/sign-up",
    ];

    const shouldDisplayCreateExpense = ["/", "/:month/:year"];

    const shouldDisplay =
        shouldDisplayCreateExpense.some((route) =>
            new RegExp(`^${route.replace(/:[^\s/]+/g, "[^/]+")}$`).test(
                pathname
            )
        ) &&
        !shouldNotDisplayCreateExpense.includes(pathname) &&
        data?.data?.length > 0;

    return (
        <MainLayout isLoading={isLoading}>
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
                        <Route
                            path="preferences"
                            element={<PreferenceSettings />}
                        />
                        <Route path="tags" element={<TagsSettings />} />
                    </Route>
                    <Route path="/:month/:year/" element={<ExpenseMonth />}>
                        <Route
                            path="analytics"
                            element={<ExpenseAnalytics />}
                        />
                    </Route>
                    <Route path="/user/:year?" element={<Profile />} />
                </Route>
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
            {shouldDisplay && data?.data?.length > 0 && <CreateExpense />}
            <Toast />
        </MainLayout>
    );
}

export default App;
