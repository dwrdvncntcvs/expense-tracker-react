import { ILink } from "@_types/navigation";
import { useSignOutMutation } from "@store/queries/user";
import { FC } from "react";
import { HiLogout } from "react-icons/hi";
import { HiCog8Tooth, HiHome, HiUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useUser } from "@store/slices/user";
import { Logo } from "./Svgs";

const Navigation: FC = () => {
    const { isAuthenticated } = useUser();

    const [signOutRequest] = useSignOutMutation();

    const links: ILink[] = [
        {
            icon: HiHome,
            label: "Home",
            path: "/",
            name: "home",
        },
        {
            icon: HiCog8Tooth,
            label: "Settings",
            path: "/settings",
            name: "settings",
        },
        {
            icon: HiUser,
            label: "User",
            path: "/user",
            name: "user",
        },
    ];

    return (
        <div className="flex items-center justify-between h-full bg-quaternary">
            <div className='md:block hidden'>
                <NavLink to="/" className="!text-primary">
                    <Logo size="navigation" />
                </NavLink>
            </div>
            {isAuthenticated && (
                <ul className="flex gap-2 md:w-auto w-full md:justify-normal justify-evenly">
                    {links.map((link) => (
                        <li
                            key={link.name}
                            className="flex items-center justify-center w-10 h-10 "
                        >
                            <NavLink
                                to={link.path}
                                id={link.name}
                                className={({ isActive }) =>
                                    `w-10 h-10 rounded-full flex justify-center items-center hover:border-2  hover:border-primary ${
                                        isActive
                                            ? "text-plain bg-primary pointer-events-none"
                                            : "text-secondary"
                                    }`
                                }
                            >
                                <link.icon size={22} />
                            </NavLink>
                        </li>
                    ))}
                    <li className="flex items-center justify-center h-10 ">
                        <button
                            id="logout"
                            name="logout-btn"
                            className="w-10 h-10 rounded-lg  flex justify-center items-center  border-primary text-primary hover:border-failure hover:text-failure "
                            type="button"
                            onClick={async () => {
                                await signOutRequest();
                            }}
                        >
                            <HiLogout size={22} />
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navigation;
