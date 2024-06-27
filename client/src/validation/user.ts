import * as Yup from "yup";

const passwordLimit = 5;

export const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(
            passwordLimit,
            `Password should be at least ${passwordLimit} characters`
        )
        .required("Password is required"),
});

export const signUpSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(
            passwordLimit,
            `Password should be at least ${passwordLimit} characters`
        )
        .required("Password is required"),
});
