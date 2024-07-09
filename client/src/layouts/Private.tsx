import { useUser } from "@store/slices/user";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Private: FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const { isAuthenticated } = useUser();

    console.log("isAuthenticated", isAuthenticated);

    if (isLoading) return <p>Loading</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default Private;
