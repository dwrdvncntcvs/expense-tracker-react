import { FC, useEffect } from "react";
import {
    HiLockClosed,
    HiOutlineTrash,
    HiPaintBrush,
    HiTag,
    HiTrash,
    HiUser,
} from "react-icons/hi2";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ILink } from "@_types/navigation";
import { useDeleteUserMutation } from "@store/queries/user";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { hide, show } from "@store/slices/modal";
import ActionButtons from "@components/ActionButtons";

const SettingsLayout: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [deleteUserRequest] = useDeleteUserMutation();

    useEffect(() => {
        const listOfUrlToTriggerNavigate = ["/settings", "/settings/"];

        if (listOfUrlToTriggerNavigate.includes(location.pathname))
            navigate("/settings/user", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const settingsNavList: ILink[] = [
        {
            name: "settings-preferences",
            icon: HiPaintBrush,
            label: "Preferences",
            path: "/settings/preferences",
        },
        {
            name: "settings-user",
            icon: HiUser,
            label: "User",
            path: "/settings/user",
        },
        {
            name: "settings-privacy",
            icon: HiLockClosed,
            label: "Privacy",
            path: "/settings/privacy",
        },
        {
            icon: HiTag,
            label: "Categories",
            path: "/settings/categories",
            name: "settings-categories",
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
                                            ? "bg-white font-bold text-primary pointer-events-none"
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
                <button
                    className="flex w-full text-sm items-center gap-2 text-failure px-5 p-2 rounded-lg hover:outline-2 hover:outline hover:outline-failure "
                    onClick={() => {
                        dispatch(show("delete-user"));
                    }}
                >
                    <HiOutlineTrash size={18} />
                    Delete Account{" "}
                    <span className="text-gray-400 text-xs">(Everything)</span>
                </button>
            </nav>
            <div className="p-2 w-full h-auto">
                <Outlet />
            </div>
            <Modal name="delete-user" title="Delete Account">
                <div className="space-y-4">
                    <p>Are you sure you want to delete your account?</p>
                    <div className="flex items-end justify-end">
                        <ActionButtons
                            className="p-5 py-2"
                            rounded="xl"
                            options={[
                                {
                                    type: "button",
                                    bgColor: "failure",
                                    color: "plain",
                                    icon: HiTrash,
                                    label: "Delete",
                                    onClick: async () => {
                                        await deleteUserRequest();
                                        dispatch(hide());
                                        navigate("/sign-in");
                                    },
                                },
                            ]}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SettingsLayout;
