import { FC, useState } from "react";
import { HiAtSymbol, HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Input } from "../components/Fields";
import { useAuthForm } from "../hooks";
import { AuthLayout } from "../layouts";

const SignIn: FC = () => {
    const [showPass, setShowPass] = useState(false);

    const { authData, handleAuthChange, handleAuthSubmit, response } =
        useAuthForm<"signIn">({
            password: "",
            email: "",
        });

    return (
        <AuthLayout>
            <form
                className="self-center w-96 flex flex-col gap-2"
                onSubmit={handleAuthSubmit}
            >
                <Input
                    type="text"
                    placeholder="Email"
                    icon={{ val: HiAtSymbol, position: "start" }}
                    name="email"
                    value={authData.email || ""}
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
