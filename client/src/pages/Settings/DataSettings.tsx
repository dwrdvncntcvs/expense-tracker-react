import { parseName } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import Button from "@components/Button";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import useExportData, { ExportMethod } from "@hooks/useExportData";
import SettingsContentLayout from "@layouts/SettingsContentLayout";
import SettingsSection from "@layouts/SettingsSection";
import { useDeleteUserMutation } from "@store/queries/user";
import { hide, show } from "@store/slices/modal";
import { capitalize } from "lodash-es";
import { FC } from "react";
import { HiOutlineTrash, HiSave, HiTrash } from "react-icons/hi";
import {
    HiArrowDownOnSquareStack,
    HiArrowDownTray,
    HiArrowUpTray,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const DataSettings: FC = () => {
    const dispatch = useAppDispatch();
    const [deleteUserRequest] = useDeleteUserMutation();
    const navigate = useNavigate();

    const {
        buttons,
        exportMethod,
        includedItems,
        unSelectMethod,
        exportDataFn,
    } = useExportData();

    return (
        <SettingsContentLayout
            title="Manage your data"
            icon={HiArrowDownOnSquareStack}
        >
            <SettingsSection description="Here you'll be able to manage your data from our system by importing information. You'll also be able to manage deleting your account in the application." />
            <SettingsSection
                title="Export"
                icon={HiArrowUpTray}
                description="You can export your data in JSON format, including your user information, all expenses, monthly expenses, categories, and tags."
            >
                <ActionButtons
                    className="px-4 py-1"
                    options={Object.keys(buttons).map((key) => {
                        const _key = key as ExportMethod;
                        return {
                            type: "button",
                            label: capitalize(parseName(_key, "_")),
                            bgColor:
                                exportMethod === _key ? "primary" : "quaternary",
                            color: exportMethod === _key ? "plain" : "primary",
                            outlineColor: "primary",
                            onClick: buttons[_key],
                            id: _key,
                        };
                    })}
                />
            </SettingsSection>
            <SettingsSection
                title="Import"
                icon={HiArrowDownTray}
                description="You can import your data with a JSON file, including your user information, all expenses, monthly expenses, categories, and tags."
            ></SettingsSection>
            <SettingsSection
                title="Delete Account"
                icon={HiTrash}
                description="Deleting your account will un-doable. Your data will be completely removed from the the application."
            >
                <button
                    className="flex  text-sm items-center gap-2 px-5 p-2 rounded-lg hover:outline-2 text-white bg-failure outline-offset-2 hover:outline hover:outline-failure "
                    onClick={() => {
                        dispatch(show("delete-user"));
                    }}
                >
                    <HiOutlineTrash size={18} />
                    Delete Account{" "}
                    <span className="text-gray-200 text-xs">(Everything)</span>
                </button>
            </SettingsSection>
            {exportMethod !== "" && (
                <Modal
                    name="export"
                    title={`Export ${capitalize(parseName(exportMethod))}`}
                    options={{
                        closeCb: () => {
                            unSelectMethod();
                        },
                    }}
                >
                    <div className="space-y-4">
                        <p>
                            This will download{" "}
                            {exportMethod === "all"
                                ? "everything from your account"
                                : `all of your ${parseName(exportMethod)}`}{" "}
                            in the application.
                        </p>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-secondary">
                                Included Items
                            </p>
                            <ul>
                                {includedItems[exportMethod].map((item) => (
                                    <li key={item} className="list-disc ml-10">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            className="p-4 py-2 w-full justify-center items-center gap-2 flex "
                            onClick={exportDataFn}
                        >
                            <HiSave size={24} />
                            Download
                        </Button>
                    </div>
                </Modal>
            )}
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
        </SettingsContentLayout>
    );
};

export default DataSettings;