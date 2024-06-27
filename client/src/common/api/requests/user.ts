import axios from "..";
import { SignInData } from "../../../types/auth";

const signInRequest = async (user: SignInData) => {
    const response = await axios.post("/users/sign-in", JSON.stringify(user));

    const data = JSON.parse(response.data);

    return {
        data,
        status: response.status,
    };
};

export default {
    signInRequest,
};
