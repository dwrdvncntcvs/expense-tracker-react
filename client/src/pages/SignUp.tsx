import { Formik } from "formik";
import { FC, useState } from "react";
import {
    HiAtSymbol,
    HiEye,
    HiEyeSlash,
    HiLockClosed,
    HiUser,
} from "react-icons/hi2";
import { Input } from "../components/Fields";
import { AuthLayout } from "../layouts";
import { signUpSchema } from "../validation/user";
import { useMutation } from "@tanstack/react-query";
import { user } from "../common/api";
import { SignUpData } from "../types/auth";
import { useNavigate } from "react-router-dom";

const SignUp: FC = () => {
    const [showPass, setShowPass] = useState(false);

    const { mutateAsync } = useMutation({
        mutationFn: (val: SignUpData) => user.signUpRequest(val),
    });

    const navigate = useNavigate();

    return (
        <AuthLayout>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    username: "",
                    email: "",
                    password: "",
                }}
                validationSchema={signUpSchema}
                onSubmit={async (val) => {
                    console.log("Val: ", val);

                    const res = await mutateAsync(val);

                    if (res.status >= 400) return;

                    navigate("/sign-in");
                }}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form
                        className="self-center w-96 flex flex-col gap-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-2">
                            <Input
                                placeholder="First Name"
                                name="first_name"
                                value={values.first_name || ""}
                                onChange={handleChange}
                                err={{
                                    has:
                                        !!errors.first_name &&
                                        touched.first_name,
                                    value: errors.first_name,
                                }}
                            />
                            <Input
                                placeholder="Last Name"
                                name="last_name"
                                value={values.last_name || ""}
                                onChange={handleChange}
                                err={{
                                    has:
                                        !!errors.last_name && touched.last_name,
                                    value: errors.last_name,
                                }}
                            />
                        </div>
                        <Input
                            placeholder="Username"
                            icon={{ val: HiUser, position: "start" }}
                            name="username"
                            value={values.username || ""}
                            onChange={handleChange}
                            err={{
                                has: !!errors.username && touched.username,
                                value: errors.username,
                            }}
                        />
                        <Input
                            placeholder="Email"
                            icon={{ val: HiAtSymbol, position: "start" }}
                            name="email"
                            value={values.email || ""}
                            onChange={handleChange}
                            err={{
                                has: !!errors.email && touched.email,
                                value: errors.email,
                            }}
                        />
                        <div className="flex gap-2">
                            <Input
                                type={showPass ? "text" : "password"}
                                icon={{ val: HiLockClosed, position: "start" }}
                                placeholder="Password"
                                name="password"
                                value={values.password || ""}
                                onChange={handleChange}
                                err={{
                                    has: !!errors.password && touched.password,
                                    value: errors.password,
                                }}
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
                )}
            </Formik>
        </AuthLayout>
    );
};

export default SignUp;
