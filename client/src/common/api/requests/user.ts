import axios from "..";
import { SignInData, SignUpData } from "../../../types/auth";

const signInRequest = async (user: SignInData) => {
    const response = await axios.post("/users/sign-in", JSON.stringify(user));

    const data = JSON.parse(response.data);

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

export default {
    signInRequest,
    signUpRequest,
};
