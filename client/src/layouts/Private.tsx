import { useUser } from "@store/slices/user";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Private: FC = () => {
    const { isAuthenticated, loading } = useUser();

    if (loading) return <p>Loading</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default Private;
