import ActionButtons from "@components/ActionButtons";
import { Field, Form } from "@components/Form";
import { useAppDispatch } from "@hooks/storeHooks";
import SettingsContentLayout from "@layouts/SettingsContentLayout";
import { useUpdateUserMutation } from "@store/queries/user";
import { success } from "@store/slices/toast";
import { useUser } from "@store/slices/user";
import { FC } from "react";
import { HiUser } from "react-icons/hi2";

const UserSettings: FC = () => {
    const { user } = useUser();
    const dispatch = useAppDispatch();

    const [updateUserRequest] = useUpdateUserMutation();

    return (
        <SettingsContentLayout icon={HiUser} title="User Information">
            <Form
                className="flex flex-wrap md:flex-row flex-col gap-4"
                initialValues={{
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    username: user?.username,
                    email: user?.email,
                }}
                onSubmit={async (val) => {
                    if (user?.id) {
                        await updateUserRequest({
                            id: user.id,
                            user: val,
                        });

                        dispatch(
                            success({ message: "User updated successfully" })
                        );
                    }
                }}
            >
                <div className="flex-1 md:w-1/2  w-full">
                    <label htmlFor="first_name">First Name</label>
                    <Field name="first_name" id="first_name" />
                </div>
                <div className="flex-1 md:w-1/2  w-full">
                    <label htmlFor="last_name">Last Name</label>
                    <Field name="last_name" id="last_name" />
                </div>
                <div className="w-full">
                    <label htmlFor="username">Username</label>
                    <Field name="username" id="username" />
                </div>
                <div className="w-full">
                    <label htmlFor="email">Email</label>
                    <Field name="email" id="email" />
                </div>
                <div className="flex flex-row-reverse w-full">
                    <ActionButtons
                        className="px-6 py-2"
                        rounded="xl"
                        options={[
                            {
                                type: "submit",
                                bgColor: "primary",
                                color: "plain",
                                label: "Save",
                            },
                        ]}
                    />
                </div>
            </Form>
        </SettingsContentLayout>
    );
};

export default UserSettings;
