import axios from "..";
import { SignInData, SignUpData } from "@_types/auth";

const signInRequest = async (user: SignInData) => {
    const response = await axios.post("/users/sign-in", JSON.stringify(user));

    const data = response.data;

    return {
        data,
        status: response.status,
    };
};

const signUpRequest = async (user: SignUpData) => {
    const response = await axios.post("/users/sign-up", JSON.stringify(user));

    const data = JSON.parse(response.data);

    return {
        data,
        status: response.status,
    };
};

const isAuthenticatedRequest = async () => {
    const response = await axios.get("/users/is-authenticated");

    return {
        data: response.data,
        status: response.status,
    };
};

const signOutRequest = async () => {
    const response = await axios.get("/users/sign-out");

    return {
        data: response.data,
        status: response.status,
    };
};

export default {
    signInRequest,
    signUpRequest,
    isAuthenticatedRequest,
    signOutRequest,
};
