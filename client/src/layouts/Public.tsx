import { FC } from "react";
import { useUser } from "../contexts/User";
import { Navigate, Outlet } from "react-router-dom";

const Public: FC = () => {
    const { isAuthenticated, loading } = useUser();

    if (loading === "pending") return <p>Loading...</p>;

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default Public;
