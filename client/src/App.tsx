import { Route, Routes } from "react-router-dom";
import { Home, Profile, SignIn, SignUp } from "./pages";
import { MainLayout } from "./layouts";

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" index element={<Home />}></Route>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/:id" element={<Profile />} />
            </Routes>
        </MainLayout>
    );
}

export default App;
