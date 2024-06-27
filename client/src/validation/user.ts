import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(5, "Password should be at least 5 characters")
        .required("Password is required"),
});
