import { Route, Routes } from "react-router-dom";
import { ForgotPassword, Home, Profile, SignIn, SignUp } from "./pages";
import { MainLayout } from "./layouts";

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/" index element={<Home />}></Route>
                <Route path="/:id" element={<Profile />} />
            </Routes>
        </MainLayout>
    );
}

export default App;
