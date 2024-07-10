import { useUser } from "@store/slices/user";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Public: FC<{ loading: boolean }> = ({ loading }) => {
    const { isAuthenticated } = useUser();

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default Public;
