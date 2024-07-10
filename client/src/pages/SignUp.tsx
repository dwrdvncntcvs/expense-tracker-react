import { Field, Form } from "@components/Form";
import { useAppDispatch } from "@hooks/storeHooks";
import { AuthLayout } from "@layouts";
import { useSignUpMutation } from "@store/queries/user";
import { success } from "@store/slices/toast";
import { FC, useState } from "react";
import {
    HiAtSymbol,
    HiEye,
    HiEyeSlash,
    HiLockClosed,
    HiUser,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../validation/user";

const SignUp: FC = () => {
    const [showPass, setShowPass] = useState(false);
    const dispatch = useAppDispatch();

    const [signUpRequest] = useSignUpMutation();

    const navigate = useNavigate();

    return (
        <AuthLayout>
            <Form
                initialValues={{
                    first_name: "",
                    last_name: "",
                    username: "",
                    email: "",
                    password: "",
                }}
                validationSchema={signUpSchema}
                onSubmit={async (val) => {
                    const res = await signUpRequest(val);

                    dispatch(
                        success({ message: "Account created successfully" })
                    );
                    navigate("/sign-in");
                }}
            >
                <div className="flex gap-2">
                    <Field placeholder="First Name" name="first_name" />
                    <Field placeholder="Last Name" name="last_name" />
                </div>
                <Field
                    placeholder="Username"
                    icon={{ val: HiUser, position: "start" }}
                    name="username"
                />
                <Field
                    placeholder="Email"
                    icon={{ val: HiAtSymbol, position: "start" }}
                    name="email"
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
                <button
                    className="w-40 h-10 flex self-end justify-center mt-4 items-center bg-primary text-plain text-end p-2 rounded-xl"
                    type="submit"
                >
                    Sign Up
                </button>
            </Form>
        </AuthLayout>
    );
};

export default SignUp;
