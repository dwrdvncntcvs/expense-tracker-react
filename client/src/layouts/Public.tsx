import { useUser } from "@store/slices/user";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Public: FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const { isAuthenticated } = useUser();

    if (isLoading) return <p>Loading...</p>;

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default Public;
