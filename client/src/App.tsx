import { Route, Routes } from "react-router-dom";
import { ForgotPassword, Home, Profile, SignIn, SignUp } from "./pages";
import { MainLayout, Private, Public } from "./layouts";
import UserProvider from "./contexts/User";

function App() {
    return (
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
                        <Route path="/" index element={<Home />}></Route>
                        <Route path="/:id" element={<Profile />} />
                    </Route>
                </Routes>
            </MainLayout>
        </UserProvider>
    );
}

export default App;
