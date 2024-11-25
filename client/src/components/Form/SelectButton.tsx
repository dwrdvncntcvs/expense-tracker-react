import { Option } from "@_types/elements";
import Button from "@components/Button";
import { useField } from "formik";
import { ButtonHTMLAttributes, FC } from "react";
import { IconType } from "react-icons";

interface ButtonIcon {
    position: "start" | "end";
    val: IconType | string;
}

interface SelectButtons extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ButtonIcon | null;
    name: string;
    options: Option[];
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const SelectButtons: FC<SelectButtons> = ({
    icon,
    name,
    options,
    buttonProps,
    ...props
}) => {
    const [p1, p2, p3] = useField(name || "");
    const { value } = p1;
    const { error, touched } = p2;
    const { setValue } = p3;

    if (props.hidden) return;

    return (
        <div className={`flex flex-col w-full h-full ${props.className}`}>
            <div className="flex gap-2 h-full">
                {options.map((_option) => {
                    const color =
                        value === _option.value ? "quaternary" : "primary";
                    const bgColor =
                        value === _option.value ? "primary" : "tertiary";

                    return (
                        <Button
                            {...buttonProps}
                            type="button"
                            color={color}
                            bgColor={bgColor}
                            key={_option.value}
                            onClick={() => {
                                setValue(_option.value);
                            }}
                            className={buttonProps?.className || "flex-1"}
                            disabled={props.disabled}
                        >
                            {icon && (
                                <div className="px-4 text-primary">
                                    {icon && typeof icon.val !== "string" && (
                                        <icon.val size={18} />
                                    )}
                                    {icon &&
                                        typeof icon.val === "string" &&
                                        icon.val}
                                </div>
                            )}
                            {_option.label}
                        </Button>
                    );
                })}
            </div>
            {error && touched && (
                <p id={`${name}-error-msg`} className="text-failure text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SelectButtons;
