import { ILink } from "@_types/navigation";
import { useSignOutMutation } from "@store/queries/user";
import { useUser } from "@store/slices/user";
import { FC } from "react";
import { HiCog8Tooth, HiHome, HiUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { Logo } from "./Svgs";
import { ActionDropdown } from "./common";
import { ActionDropdownOption } from "./common/ActionDropdown";

const Navigation: FC = () => {
    const { isAuthenticated, user } = useUser();

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
    ];

    const actionDropdownOptions: ActionDropdownOption[] = [
        {
            label: `${user?.first_name || ""} ${user?.last_name || ""}`,
            href: "/user",
            type: "link"
        },
        {
            label: "Sign out",
            onClick: async () => {
                await signOutRequest();
            },
            type: "button"
        }
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
                                    `w-10 h-10 rounded-full flex justify-center items-center hover:border-2  hover:border-primary ${isActive
                                        ? "text-plain bg-primary pointer-events-none"
                                        : "text-secondary"
                                    }`
                                }
                            >
                                <link.icon size={22} />
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <ActionDropdown
                            Icon={HiUser}
                            options={actionDropdownOptions}
                        />
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navigation;
