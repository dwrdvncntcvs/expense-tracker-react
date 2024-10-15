import {
    BgColor,
    BgColorClass,
    Color,
    ColorClass,
    Roundness,
    RoundnessClass,
} from "@_types/components/button";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface ButtonProp
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        PropsWithChildren {
    color?: Color;
    bgColor?: BgColor;
    rounded?: Roundness;
    className?: string;
}

const Button: FC<ButtonProp> = ({
    children,
    color = "plain",
    bgColor = "primary",
    className,
    rounded = "lg",
    ...props
}) => {
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

    const roundedClass: RoundnessClass = {
        sm: "rounded-sm",
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
        xl: "rounded-xl",
        none: "rounded-none"
    };

    return (
        <button
            className={`
                ${colorClass[color]} 
                ${bgColorClass[bgColor]} 
                ${roundedClass[rounded]} 
                ${className} disabled:opacity-60 disabled:pointer-events-none`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
