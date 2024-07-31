import { FC, PropsWithChildren } from "react";
import logo from "../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <div className="flex justify-center flex-col items-center h-full">
            <img src={logo} alt="Expense Tracker Logo" />
            {children}
            {pathname === "/sign-in" && (
                <div className="mt-5 text-primary">
                    <Link to="/sign-up">Doesn't have an account yet?</Link>
                </div>
            )}
            {pathname === "/sign-up" && (
                <div className="mt-5 text-primary">
                    <Link to="/sign-in">Already have an account?</Link>
                </div>
            )}
        </div>
    );
};

export default AuthLayout;
