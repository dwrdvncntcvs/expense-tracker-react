import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    options: { label: string; value: string; selected?: boolean | undefined }[];
}

const Select: FC<SelectProps> = ({ options, ...props }) => {
    const [p1, p2] = useField(props.name || "");

    const { name, onBlur, onChange, value } = p1;
    const { error, touched } = p2;

    return (
        <select
            {...props}
            className={`border rounded-xl w-full overflow-auto flex items-center resize-none  ${
                error && touched ? "border-failure" : ""
            } w-full p-2 outline-none px-4`}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
        >
            <option value=""></option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
