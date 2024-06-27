import { FC, useState } from "react";
import { AuthLayout } from "../layouts";
import { Input } from "../components/Fields";
import {
    HiAtSymbol,
    HiEye,
    HiEyeSlash,
    HiLockClosed,
    HiUser,
} from "react-icons/hi2";
import { useAuthForm } from "../hooks";

const SignUp: FC = () => {
    const [showPass, setShowPass] = useState(false);

    const { authData, handleAuthChange, handleAuthSubmit } =
        useAuthForm<"signUp">({
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            username: "",
        });

    return (
        <AuthLayout>
            <form
                className="self-center w-96 flex flex-col gap-2"
                onSubmit={handleAuthSubmit}
            >
                <div className="flex gap-2">
                    <Input
                        placeholder="First Name"
                        name="first_name"
                        value={authData.first_name || ""}
                        onChange={handleAuthChange}
                    />
                    <Input
                        placeholder="Last Name"
                        name="last_name"
                        value={authData.last_name || ""}
                        onChange={handleAuthChange}
                    />
                </div>
                <Input
                    placeholder="Username"
                    icon={{ val: HiUser, position: "start" }}
                    name="username"
                    value={authData.username || ""}
                    onChange={handleAuthChange}
                />
                <Input
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
                <button className="w-40 h-10 flex self-end justify-center mt-4 items-center bg-primary text-plain text-end p-2 rounded-xl">
                    Sign Up
                </button>
            </form>
        </AuthLayout>
    );
};

export default SignUp;
