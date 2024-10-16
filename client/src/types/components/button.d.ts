import { IconType } from "react-icons";

export type Color =
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "failure"
    | "success"
    | "warning"
    | "plain"
    | "light";

export type Size = "sm" | "md" | "lg" | "xl";

export type BgColor = Color;

export interface ColorClass {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    failure: string;
    success: string;
    warning: string;
    plain: string;
    light: string;
}

export type BgColorClass = ColorClass;

export type OutlineColor = Color;

export type OutlineColorClass = ColorClass;

export interface SizeClass {
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

export type Roundness = Size | "full" | "none";
export interface RoundnessClass extends SizeClass {
    full: string;
    none: string;
}

export type Variant = "outlined" | "solid" | "none";

export interface ActionButtonOptions {
    color?: Color;
    bgColor?: BgColor;
    outlineColor?: OutlineColor;
    type: "submit" | "button" | "reset";
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    icon?: IconType;
    disabled?: boolean;
    id?: string;
}
