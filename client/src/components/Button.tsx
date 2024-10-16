import {
    BgColor,
    BgColorClass,
    Color,
    ColorClass,
    OutlineColor,
    OutlineColorClass,
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
    outlineColor?: OutlineColor;
}

const Button: FC<ButtonProp> = ({
    children,
    color = "plain",
    bgColor = "primary",
    outlineColor = "plain",
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
        none: "rounded-none",
    };

    const outlineClass: OutlineColorClass = {
        primary:
            "border border-2 border-primary hover:bg-primary transition-all hover:text-white",
        secondary:
            "border border-2 border-secondary hover:bg-secondary transition-all hover:text-white",
        tertiary:
            "border border-2 border-tertiary hover:bg-tertiary transition-all hover:text-white",
        quaternary:
            "border border-2 border-quaternary hover:bg-quaternary transition-all hover:text-white",
        failure:
            "border border-2 border-failure hover:bg-failure transition-all hover:text-white",
        success:
            "border border-2 border-success hover:bg-success transition-all hover:text-white",
        warning:
            "border border-2 border-warning hover:bg-warning transition-all hover:text-white",
        plain: "border border-2 border-white hover:bg-gray/10",
        light: "border border-2 border-light transition-all hover:text-white",
    };

    return (
        <button
            className={`
                ${outlineClass[outlineColor]}
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
