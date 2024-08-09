import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface SettingsSectionProps extends PropsWithChildren {
    title?: string;
    icon?: IconType;
    description?: string;
}

const SettingsSection: FC<SettingsSectionProps> = ({
    title,
    icon,
    children,
    description,
}) => {
    const Icon = icon;

    return (
        <div className="flex flex-col gap-4">
            {title && (
                <h3 className="text-primary text-xl font-semibold flex gap-2 items-center">
                    {Icon && (
                        <span>
                            <Icon size={20} />
                        </span>
                    )}
                    {title}
                </h3>
            )}
            {description && (
                <p className="text-tertiary text-sm">{description}</p>
            )}
            <div className="space-y-4">{children}</div>
        </div>
    );
};

export default SettingsSection;
