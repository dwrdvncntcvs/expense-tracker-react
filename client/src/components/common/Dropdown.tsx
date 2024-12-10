import { Option } from "@_types/elements";
import Button from "@components/Button";
import { FC, useEffect, useRef, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export type DropdownProps = {
    label: string;
    options: Option[];
    value: string;
    className?: string;
    buttonClassName?: string;
    shouldUpdateLabel?: boolean;
    canClear?: boolean;
    selectCb?: (value: string) => void;
};

const Dropdown: FC<DropdownProps> = ({
    label,
    value,
    className,
    buttonClassName,
    options,
    shouldUpdateLabel,
    canClear,
    selectCb,
}) => {
    const [currentLabel, setCurrentLabel] = useState(label);
    const [selectedValue, setSelectedValue] = useState(value);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target;

        if (target instanceof Node)
            if (ref.current && target && !ref.current.contains(target)) {
                setIsDropdownOpen(false);
            }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDropdown = () => {
        setIsDropdownOpen((val) => !val);
    };

    const handleSelect = (_option: Option) => () => {
        console.log(_option);
        if (shouldUpdateLabel) {
            setCurrentLabel(_option.label);
        }

        if (selectCb) selectCb(_option.value);

        setSelectedValue(_option.value);
        setIsDropdownOpen(false);
    };

    const clearSelected = () => {
        setCurrentLabel(label);
        setSelectedValue("");
        setIsDropdownOpen(false);
    };

    return (
        <div className={`relative ${className || ""}`} ref={ref}>
            <Button
                color="plain"
                bgColor="primary"
                className={`${
                    buttonClassName || ""
                } p-2 px-4 flex gap-2 items-center justify-between ${
                    !isDropdownOpen || "rounded-b-none"
                }`}
                rounded="lg"
                onClick={handleDropdown}
            >
                {currentLabel}
                {isDropdownOpen ? (
                    <HiChevronUp size={24} />
                ) : (
                    <HiChevronDown size={24} />
                )}
            </Button>
            {isDropdownOpen && (
                <div className="absolute w-full z-30">
                    <ul className="flex flex-col bg-tertiary rounded-b-lg overflow-hidden">
                        {options.map((_option) => (
                            <li key={_option.value} className="w-full">
                                <button
                                    className={`w-full text-center p-1 text-quaternary hover:bg-secondary ${
                                        _option.value.toString() === selectedValue
                                            ? "pointer-events-none bg-secondary"
                                            : ""
                                    }`}
                                    onClick={handleSelect(_option)}
                                >
                                    {_option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {canClear && selectedValue && (
                        <Button
                            className="mt-1 w-full text-sm p-1"
                            color="plain"
                            bgColor="failure"
                            onClick={clearSelected}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
