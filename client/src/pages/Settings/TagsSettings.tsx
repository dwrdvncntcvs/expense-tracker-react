import { Tag } from "@components/common";
import SettingsContentLayout from "@layouts/SettingsContentLayout";
import SettingsSection from "@layouts/SettingsSection";
import { useRemoveTagMutation } from "@store/queries/tags";
import { useSettings } from "@store/slices/settings";
import { FC } from "react";
import { HiTag } from "react-icons/hi2";

const TagsSettings: FC = () => {
    const { tags } = useSettings();

    const [remove] = useRemoveTagMutation();

    const removeTag = async (id: string) => {
        await remove(id);
    };

    return (
        <SettingsContentLayout icon={HiTag} title="Tags">
            <SettingsSection description="Here you can manage only the tags you have created. Tags can be added directly while creating expenses, and they will be displayed in this section. You have the ability to delete any of the tags listed here.">
                <div className="flex gap-2 flex-wrap">
                    {tags.length > 0 ? (
                        tags.map((tag) => (
                            <Tag id={tag.id} key={tag.id} onRemove={removeTag}>
                                {tag.name}
                            </Tag>
                        ))
                    ) : (
                        <p className="text-primary">No tags added yet.</p>
                    )}
                </div>
            </SettingsSection>
        </SettingsContentLayout>
    );
};

export default TagsSettings;
