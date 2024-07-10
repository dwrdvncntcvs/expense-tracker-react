import { CreateExpense } from "@components/Expense";
import { useAppDispatch } from "@hooks/storeHooks";
import { MainLayout, Private, Public, SettingsLayout, Toast } from "@layouts";
import { ForgotPassword, Home, Profile, SignIn, SignUp } from "@pages";
import { CategoriesSettings, UserSettings } from "@pages/Settings";
import { useUser } from "@store/slices/user";
import { getCategoryRequest } from "@store/thunk/categories";
import { isAuthenticatedRequest } from "@store/thunk/user";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
    const dispatch = useAppDispatch();
    const { accessToken } = useUser();

    useEffect(() => {
        const initializeData = async () => {
            await Promise.all([
                !accessToken ? dispatch(isAuthenticatedRequest()) : null,
                accessToken ? dispatch(getCategoryRequest()) : null,
            ]);
        };

        initializeData();
    }, [accessToken]);

    const { pathname } = useLocation();

    const shouldDisplayCreateExpense = ["/", "/user"];

    return (
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
