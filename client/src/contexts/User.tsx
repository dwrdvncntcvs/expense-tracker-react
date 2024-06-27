import { QueryStatus, useQuery } from "@tanstack/react-query";
import {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "../common/api";
import { User, UserResponse } from "../types/auth";

interface IUserContext {
    isAuthenticated: boolean;
    user: User | null;
    loading: QueryStatus;
    error: object | null;
}

const UserContext = createContext<IUserContext>({
    isAuthenticated: false,
    user: null,
    loading: "success",
    error: null,
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

    const userResponse: UserResponse = data ? JSON.parse(data.data) : null;

    const user: User | null = userResponse ? userResponse.user : null;

    const isAuthenticated = !!userResponse?.accessToken;

    const error = data && data?.status >= 400 ? JSON.parse(data.data) : null;

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
