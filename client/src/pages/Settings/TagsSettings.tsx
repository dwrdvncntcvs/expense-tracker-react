import SettingsContentLayout from "@layouts/SettingsContentLayout";
import SettingsSection from "@layouts/SettingsSection";
import { FC } from "react";
import { HiTag } from "react-icons/hi2";

const TagsSettings: FC = () => {
    return (
        <SettingsContentLayout icon={HiTag} title="Tags">
            <SettingsSection description="Here you can manage only the tags you have created. Tags can be added directly while creating expenses, and they will be displayed in this section. You have the ability to delete any of the tags listed here."></SettingsSection>
        </SettingsContentLayout>
    );
};

export default TagsSettings;
