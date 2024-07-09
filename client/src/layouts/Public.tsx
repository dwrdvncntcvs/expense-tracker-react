import { useUser } from "@store/slices/user";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Public: FC = () => {
    const { isAuthenticated, loading } = useUser();

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default Public;
