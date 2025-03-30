import type { IconType } from "react-icons";

export interface ILink {
    path: string;
    label: string;
    icon: IconType;
    name: string;
}

export interface IActionButton {
    icon: IconType;
    label: string;
    name: string;
    onClick: () => void;
}

