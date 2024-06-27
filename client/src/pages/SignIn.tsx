import { Formik } from "formik";
import { FC, useState } from "react";
import { HiAtSymbol, HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Input } from "../components/Fields";
import { AuthLayout } from "../layouts";
import { useMutation } from "@tanstack/react-query";
import { user } from "../common/api";
import { signInSchema } from "../validation/user";
import { SignInData } from "../types/auth";
import { useUser } from "../contexts/User";

const SignIn: FC = () => {
    const { refetchAuth } = useUser();
    const [showPass, setShowPass] = useState(false);

    const { mutateAsync } = useMutation<any, any, SignInData>({
        mutationKey: ["sign-in"],
        mutationFn: ({ email, password }) =>
            user.signInRequest({ email, password }),
    });

    return (
        <AuthLayout>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signInSchema}
                validateOnBlur={true}
                validateOnChange={true}
                onSubmit={async (val) => {
                    const res = await mutateAsync(val);

                    if (res.status >= 400) {
                        return;
                    }

                    refetchAuth();
                }}
            >
                {({
                    errors,
                    values,
                    touched,
                    handleChange,
                    isSubmitting,
                    handleSubmit,
                }) => (
                    <form
                        className="self-center w-96 flex flex-col gap-2"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            type="text"
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
                        </div>
                        <Link
                            to="/forgot-password"
                            className="text-end text-primary"
                        >
                            Forgot Password?
                        </Link>
                        <div className="flex gap-2 items-end justify-end">
                            <button
                                className="h-10 w-14 border flex items-center justify-center text-primary rounded-xl"
                                type="button"
                                onClick={() => {
                                    setShowPass((val) => !val);
                                }}
                            >
                                {showPass ? <HiEyeSlash /> : <HiEye />}
                            </button>
                            <button
                                className="w-40 h-10 flex self-end justify-center mt-4 items-center bg-primary text-plain text-end p-2 rounded-xl disabled:cursor-not-allowed disabled:opacity-5"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default SignIn;
