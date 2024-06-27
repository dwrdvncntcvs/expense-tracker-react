import { FC } from "react";
import { useUser } from "../contexts/User";
import { Navigate, Outlet } from "react-router-dom";

const Private: FC = () => {
    const { isAuthenticated, loading } = useUser();

    if (loading === "pending") return <p>Loading</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default Private;
