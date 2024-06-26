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

const SignUp: FC = () => {
    const [showPass, setShowPass] = useState(false);

    return (
        <AuthLayout>
            <form className="self-center w-96 flex flex-col gap-2">
                <div className="flex gap-2">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                </div>
                <Input
                    placeholder="Username"
                    icon={{ val: HiUser, position: "start" }}
                />
                <Input
                    placeholder="Email"
                    icon={{ val: HiAtSymbol, position: "start" }}
                />
                <div className="flex gap-2">
                    <Input
                        type={showPass ? "text" : "password"}
                        icon={{ val: HiLockClosed, position: "start" }}
                        placeholder="Password"
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
