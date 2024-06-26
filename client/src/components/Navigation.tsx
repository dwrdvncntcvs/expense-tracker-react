import { FC } from "react";
import { HiCog8Tooth, HiHome, HiUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ILink } from "../types/navigation";

const Navigation: FC = () => {
    const links: ILink[] = [
        {
            icon: HiHome,
            label: "Home",
            path: "/",
        },
        {
            icon: HiCog8Tooth,
            label: "Settings",
            path: "/settings",
        },
        {
            icon: HiUser,
            label: "User",
            path: "/user",
        },
    ];

    return (
        <div className="flex items-center justify-between h-full">
            <div>
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="Expense Tracker Logo"
                        className="object-fit w-16 h-w-16"
                    />
                </NavLink>
            </div>
            <ul className="flex gap-2">
                {links.map((link) => (
                    <li
                        key={link.path}
                        className="flex items-center justify-center w-10 h-10 "
                    >
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `w-10 h-10 rounded-full flex justify-center items-center ${
                                    isActive
                                        ? "text-plain bg-primary "
                                        : "text-secondary"
                                }`
                            }
                        >
                            <link.icon size={22} />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;
