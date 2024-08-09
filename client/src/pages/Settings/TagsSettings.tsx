import SettingsContentLayout from "@layouts/SettingsContentLayout";
import { FC } from "react";
import { HiTag } from "react-icons/hi2";

const TagsSettings: FC = () => {
    return (
        <SettingsContentLayout
            icon={HiTag}
            title="Tags"
        ></SettingsContentLayout>
    );
};

export default TagsSettings;
