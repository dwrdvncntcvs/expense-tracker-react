import { QueryStatus, useQuery } from "@tanstack/react-query";
import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
} from "react";
import axios from "../common/api";
import { User, UserResponse } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface IUserContext {
    isAuthenticated: boolean;
    user: User | null;
    loading: QueryStatus;
    error: object | null;
    signOutAction: () => void;
    refetchAuth: any;
}

const UserContext = createContext<IUserContext>({
    isAuthenticated: false,
    user: null,
    loading: "success",
    error: null,
    signOutAction: () => {},
    refetchAuth: () => {},
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const {
        data,
        status: loading,
        refetch,
    } = useQuery({
        queryKey: ["is-auth"],
        queryFn: () => axios.get("/users/is-authenticated"),
        enabled: false,
    });

    const { refetch: signOutRefetch } = useQuery({
        queryKey: ["sign-out"],
        queryFn: () => axios.get("/users/sign-out"),
        enabled: false,
    });

    const navigate = useNavigate();

    const userResponse: UserResponse = data ? JSON.parse(data.data) : null;

    const user: User | null = userResponse ? userResponse.user : null;

    const isAuthenticated = !!userResponse?.accessToken;

    const error = data && data?.status >= 400 ? JSON.parse(data.data) : null;

    const signOutAction = async () => {
        const res = await signOutRefetch();

        if (res.data && res.data.status >= 400) return;

        if (res.status === "success") navigate("/sign-in", { replace: true });

        refetch();
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                error,
                signOutAction,
                refetchAuth: refetch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error();
    }

    return context;
};

export default UserProvider;
