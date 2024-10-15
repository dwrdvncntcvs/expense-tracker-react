import ActionButtons from "@components/ActionButtons";
import { Field, Form } from "@components/Form";
import { useAppDispatch } from "@hooks/storeHooks";
import SettingsContentLayout from "@layouts/SettingsContentLayout";
import SettingsSection from "@layouts/SettingsSection";
import { useUpdatePasswordMutation } from "@store/queries/user";
import { error, success } from "@store/slices/toast";
import { FC, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";

const PrivacySettings: FC = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const [updatePasswordRequest] = useUpdatePasswordMutation();

    return (
        <SettingsContentLayout icon={HiLockClosed} title="Privacy Settings">
            <SettingsSection title="Change Password">
                <Form
                    className="flex flex-wrap gap-4"
                    onSubmit={async (val, resetForm) => {
                        const response = await updatePasswordRequest(val);

                        if (showPassword) setShowPassword(false);

                        dispatch(
                            Object.keys(response?.error || {}).length < 1
                                ? success({
                                      message: "Password changed successfully",
                                  })
                                : error({
                                      message: "Wasn't able to change password",
                                  })
                        );
                        resetForm();
                    }}
                    initialValues={{ password: "", newPassword: "" }}
                >
                    <div className="flex flex-col gap-2 flex-1">
                        <Field
                            placeholder="Old Password"
                            name="password"
                            id="password"
                            type={showPassword ? "text" : "password"}
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <Field
                            placeholder="New password"
                            name="newPassword"
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                        />
                    </div>
                    <div className="w-full flex flex-row-reverse">
                        <ActionButtons
                            className="px-6 py-2 h-10"
                            rounded="xl"
                            options={[
                                {
                                    id: "toggle-password-btn",
                                    type: "button",
                                    bgColor: "primary",
                                    color: "plain",
                                    icon: showPassword ? HiEyeSlash : HiEye,
                                    onClick: () => {
                                        setShowPassword((prev) => !prev);
                                    },
                                },
                                {
                                    type: "submit",
                                    color: "plain",
                                    bgColor: "primary",
                                    icon: HiPencil,
                                    label: "Update Password",
                                },
                            ]}
                        />
                    </div>
                </Form>
            </SettingsSection>
        </SettingsContentLayout>
    );
};

export default PrivacySettings;
