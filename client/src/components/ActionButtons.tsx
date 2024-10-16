import { ActionButtonOptions, Roundness } from "@_types/components/button";
import { FC } from "react";
import Button from "./Button";

interface ActionButtonsProps {
    options: ActionButtonOptions[];
    className?: string;
    rounded?: Roundness;
}

const ActionButtons: FC<ActionButtonsProps> = ({
    className,
    options,
    rounded,
}) => {
    return (
        <div className="flex gap-2 items-center flex-wrap">
            {options.map(
                (
                    {
                        label,
                        type,
                        bgColor,
                        outlineColor,
                        color,
                        onClick,
                        icon: Icon,
                        disabled = false,
                        id,
                    },
                    i
                ) => (
                    <Button
                        key={i}
                        type={type}
                        onClick={onClick}
                        color={color}
                        bgColor={bgColor}
                        outlineColor={outlineColor}
                        className={`flex gap-2 items-center ${className}`}
                        rounded={rounded}
                        disabled={disabled}
                        id={id}
                    >
                        {Icon && <Icon size={20} />}
                        {label && label}
                    </Button>
                )
            )}
        </div>
    );
};

export default ActionButtons;
