import { FC, PropsWithChildren } from "react";

interface SettingsContentLayoutProps extends PropsWithChildren {
    title: string;
}

const SettingsContentLayout: FC<SettingsContentLayoutProps> = ({
    title,
    children,
}) => {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold text-black/80">{title}</h1>
            <div className="space-y-4">{children}</div>
        </div>
    );
};

export default SettingsContentLayout;
