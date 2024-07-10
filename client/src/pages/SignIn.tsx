import { Field, Form } from "@components/Form";
import { useAppDispatch } from "@hooks/storeHooks";
import { AuthLayout } from "@layouts";
import { useSignInMutation } from "@store/queries/user";
import { isAuthenticatedRequest } from "@store/thunk/user";
import { FC, useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiAtSymbol, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { signInSchema } from "../validation/user";

const SignIn: FC = () => {
    const [showPass, setShowPass] = useState(false);
    const dispatch = useAppDispatch();
    const [signInRequest] = useSignInMutation();

    return (
        <AuthLayout>
            <Form
                initialValues={{ email: "", password: "" }}
                onSubmit={async (val, resetForm) => {
                    const res = await signInRequest(val);

                    dispatch(isAuthenticatedRequest());
                    resetForm();
                }}
                validationSchema={signInSchema}
            >
                <Field
                    name="email"
                    icon={{ val: HiAtSymbol, position: "start" }}
                    placeholder="Email"
                />
                <div className="flex gap-2">
                    <Field
                        type={showPass ? "text" : "password"}
                        icon={{ val: HiLockClosed, position: "start" }}
                        placeholder="Password"
                        name="password"
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
                >
                    Sign In
                </button>
            </Form>
        </AuthLayout>
    );
};

export default SignIn;
