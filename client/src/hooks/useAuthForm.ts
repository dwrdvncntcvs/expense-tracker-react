import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "../common/api/";
import { SignInData, SignUpData } from "../types/auth";
import { useNavigate } from "react-router-dom";

type AuthDataType = "signIn" | "signUp";

interface AuthData {
    signUp: SignUpData;
    signIn: SignInData;
}

const useAuthForm = <T extends AuthDataType>(data: AuthData[T]) => {
    const [authData, setAuthData] = useState<Partial<AuthData[T]>>(() => data);

    const navigate = useNavigate();

    const {
        data: resData,
        status,
        mutateAsync,
    } = useMutation({
        mutationFn: () => {
            const url =
                "first_name" in data ? "/users/sign-up" : "/users/sign-in";

            console.log("Auth Data: ", authData);

            return axios.post(url, JSON.stringify(authData));
        },
    });

    const handleAuthChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthData((val) => ({ ...val, [e.target.name]: e.target.value }));
    };

    const handleAuthSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await mutateAsync();

        if (res.status >= 400) {
            setAuthData(data);
            return;
        }

        if ("first_name" in data) {
            navigate("/sign-in");
        } else {
            navigate("/");
        }
    };

    return {
        authData,
        handleAuthChange,
        handleAuthSubmit,
        response: {
            data:
                resData && resData?.status < 400
                    ? JSON.parse(resData.data)
                    : null,
            error:
                resData && resData?.status >= 400
                    ? JSON.parse(resData?.data)
                    : null,
            loading: status,
        },
    };
};

export default useAuthForm;