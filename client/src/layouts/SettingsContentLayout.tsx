import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface SettingsContentLayoutProps extends PropsWithChildren {
    title: string;
    icon?: IconType;
}

const SettingsContentLayout: FC<SettingsContentLayoutProps> = ({
    title,
    icon,
    children,
}) => {
    const Icon = icon;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center text-black/80">
                {Icon && <Icon size={30}/>}
                <h1 className="text-3xl font-bold ">{title}</h1>
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
};

export default SettingsContentLayout;
