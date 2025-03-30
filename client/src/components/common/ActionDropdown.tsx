import useClickOutside from "@hooks/useClickOutside";
import { FC, useRef, useState } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";


export type ActionDropdownOption = {
    label: string;
    type: "link" | "button";
    onClick?: () => void;
    href?: string;
}


interface ActionDropdownProps {
    label?: string;
    Icon?: IconType
    options: ActionDropdownOption[];
}

export const ActionDropdown: FC<ActionDropdownProps> = ({ label, Icon, options }) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const handleShowOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    }

    const handleCloseOptions = () => {
        setIsOptionsOpen(false);
    }

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, handleCloseOptions);

    const renderOption = (option: ActionDropdownOption) => {
        if (option.type === "link") {
            return <NavLink to={option.href || "#"} onClick={handleCloseOptions} className="text-sm w-full text-left px-4 py-2 hover:bg-primary text-quaternary">
                {option.label}
            </NavLink>;
        }
        return <button className="text-sm w-full text-left px-4 py-2 hover:bg-primary text-quaternary" onClick={option.onClick}>
            {option.label}
        </button>;
    }
    return (
        <div className="relative" ref={ref}>
            <button
                className={`w-10 h-10 rounded-full flex justify-center items-center hover:border-2  hover:border-primary text-secondary`}
                onClick={handleShowOptions}
            >
                {Icon && <Icon size={22} className="text-inherit" />}
                {label && label}
            </button>
            {isOptionsOpen && (
                <div className="absolute top-[calc(100%+5px)] right-0 w-40 flex flex-col bg-tertiary shadow-lg rounded-lg overflow-auto">
                    {options.map((option) => (
                        <div key={option.label} className="w-full flex">
                            {renderOption(option)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
