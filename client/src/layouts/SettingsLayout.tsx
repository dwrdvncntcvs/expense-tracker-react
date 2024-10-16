import { ILink } from "@_types/navigation";
import { FC, useEffect } from "react";
import {
    HiArrowDownOnSquareStack,
    HiLockClosed,
    HiPaintBrush,
    HiSquare3Stack3D,
    HiTag,
    HiUser,
} from "react-icons/hi2";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const SettingsLayout: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const listOfUrlToTriggerNavigate = ["/settings", "/settings/"];

        if (listOfUrlToTriggerNavigate.includes(location.pathname))
            navigate("/settings/user", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const settingsNavList: ILink[] = [
        {
            name: "settings-user",
            icon: HiUser,
            label: "User",
            path: "/settings/user",
        },
        {
            name: "settings-preferences",
            icon: HiPaintBrush,
            label: "Preferences",
            path: "/settings/preferences",
        },
        {
            name: "settings-privacy",
            icon: HiLockClosed,
            label: "Privacy",
            path: "/settings/privacy",
        },
        {
            icon: HiSquare3Stack3D,
            label: "Categories",
            path: "/settings/categories",
            name: "settings-categories",
        },
        {
            icon: HiTag,
            label: "Tags",
            path: "/settings/tags",
            name: "settings-tags",
        },
        {
            icon: HiArrowDownOnSquareStack,
            label: "Data",
            path: "/settings/data",
            name: "settings-data",
        },
    ];

    return (
        <div className="flex">
            <nav className="w-[500px] p-2 space-y-2">
                <h1 className="font-bold text-3xl text-primary">Settings</h1>
                <ul className="space-y-1">
                    {settingsNavList.map((settingsNav) => (
                        <li key={settingsNav.path}>
                            <NavLink
                                to={settingsNav.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-5 p-2 transition-all duration-75 rounded-lg hover:bg-tertiary hover:text-white ${
                                        isActive
                                            ? " font-bold text-primary pointer-events-none"
                                            : "text-black/80 "
                                    }`
                                }
                            >
                                <settingsNav.icon size={18} />
                                {settingsNav.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-2 w-full h-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default SettingsLayout;
