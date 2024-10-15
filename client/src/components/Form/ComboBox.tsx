import { Option } from "@_types/elements";
import Button from "@components/Button";
import { useField } from "formik";
import { FC, InputHTMLAttributes, useEffect } from "react";

interface ComboBoxProps {
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    name: string;
    options: Option[];
    setSelectedValues?: (values: string[]) => void;
    selectedValues: string[];
}

const ComboBox: FC<ComboBoxProps> = ({
    inputProps,
    name,
    options,
    setSelectedValues,
    selectedValues,
}) => {
    const field = useField(name);

    useEffect(() => {
        field[2].setValue(selectedValues);
    }, [selectedValues]);

    return (
        <div className="flex flex-col gap-1 relative">
            <div
                id={`${name}-form-group`}
                className={`border rounded-xl w-full overflow-auto flex items-center border-primary`}
            >
                <input
                    {...inputProps}
                    className={`w-full p-2 outline-none px-4 bg-quaternary h-10`}
                    value={inputProps.value}
                    onChange={inputProps.onChange}
                    onKeyDown={inputProps.onKeyDown}
                />
            </div>
            {inputProps.value && !!options.length && (
                <div className="w-full max-h-36 overflow-y-auto flex flex-col absolute top-12 bg-quaternary border-primary shadow-sm rounded-xl border overflow-auto">
                    {options.map((option) => (
                        <Button
                            type="button"
                            key={option.value}
                            bgColor="quaternary"
                            color="primary"
                            className="hover:bg-tertiary p-2 text-sm"
                            rounded="none"
                            onClick={() => {
                                const value = field[0].value;

                                const updatedValues = [...value, option.value];

                                field[2].setValue(updatedValues);

                                if (setSelectedValues)
                                    setSelectedValues(updatedValues);
                            }}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComboBox;
