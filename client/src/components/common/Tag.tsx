import { BgColor, BgColorClass, Color, ColorClass } from "@_types/components/button";
import { FC, PropsWithChildren } from "react";
import { HiX } from "react-icons/hi";

interface TagProps extends PropsWithChildren {
    onRemove?: ((id: string) => Promise<void> | void) | undefined;
    id: string;
    color?: Color
    bgColor?: BgColor
}

const Tag: FC<TagProps> = ({ children, onRemove, id, color = "plain", bgColor = 'primary' }) => {
    const colorClass: ColorClass = {
        primary: "text-primary",
        secondary: "text-secondary",
        tertiary: "text-tertiary",
        quaternary: "text-quaternary",
        failure: "text-failure",
        success: "text-success",
        warning: "text-warning",
        plain: "text-white",
        light: "text-light/30",
    };

    const bgColorClass: BgColorClass = {
        primary: "bg-primary hover:bg-primary/80",
        secondary: "bg-secondary hover:bg-secondary/80",
        tertiary: "bg-tertiary hover:bg-tertiary/80",
        quaternary: "bg-quaternary hover:bg-quaternary/80",
        failure: "bg-failure hover:bg-failure/80",
        success: "bg-success hover:bg-success/80",
        warning: "bg-warning hover:bg-warning/80",
        plain: "bg-white hover:bg-gray/10",
        light: "bg-light/30",
    };

    return (
        <div className={`flex items-center gap-2 ${colorClass[color]} ${bgColorClass[bgColor]} py-1 px-3 text-xs rounded-xl`}>
            <p className="text-inherit">{children}</p>
            {onRemove && (
                <button type="button" onClick={() => onRemove(id)}>
                    <HiX className="text-inherit" />
                </button>
            )}
        </div>
    );
};

export default Tag;
