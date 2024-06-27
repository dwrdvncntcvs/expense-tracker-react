import { FC, useState } from "react";
import { Input } from "../components/Fields";
import { HiEye, HiLockClosed, HiUser, HiEyeSlash } from "react-icons/hi2";
import { AuthLayout } from "../layouts";
import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks";

const SignIn: FC = () => {
    const [showPass, setShowPass] = useState(false);

    const { authData, handleAuthChange, handleAuthSubmit, response } =
        useAuthForm<"signIn">({
            password: "",
            username: "",
        });

    return (
        <AuthLayout>
            <form
                className="self-center w-96 flex flex-col gap-2"
                onSubmit={handleAuthSubmit}
            >
                <Input
                    type="text"
                    placeholder="Username"
                    icon={{ val: HiUser, position: "start" }}
                    name="username"
                    value={authData.username || ""}
                    onChange={handleAuthChange}
                />
                <div className="flex gap-2">
                    <Input
                        type={showPass ? "text" : "password"}
                        icon={{ val: HiLockClosed, position: "start" }}
                        placeholder="Password"
                        name="password"
                        value={authData.password || ""}
                        onChange={handleAuthChange}
                    />
                    <button
                        className="h-10 w-14 border flex items-center justify-center text-primary rounded-xl"
                        type="button"
                        onClick={() => {
                            setShowPass((val) => !val);
                        }}
                    >
                        {showPass ? <HiEyeSlash /> : <HiEye />}
                    </button>
                </div>
                <Link to="/forgot-password" className="text-end text-primary">
                    Forgot Password?
                </Link>
                <button
                    className="w-40 h-10 flex self-end justify-center mt-4 items-center bg-primary text-plain text-end p-2 rounded-xl disabled:cursor-not-allowed disabled:opacity-5"
                    type="submit"
                    disabled={response.loading === "pending"}
                >
                    Sign In
                </button>
            </form>
        </AuthLayout>
    );
};

export default SignIn;
