import { useField } from "formik";
import { type FC, type InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface InputIcon {
    position: "start" | "end";
    val: IconType | string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: InputIcon | null;
}

const Field: FC<InputProps> = ({ icon, ...props }) => {
    const [p1, p2] = useField(props?.name || "");
    const { name, onBlur, onChange, value } = p1;
    const { error, touched } = p2;

    return (
        <div className="flex flex-col w-full items-end">
            <div
                id={`${name}-form-group`}
                className={`border rounded-xl w-full overflow-auto flex ${
                    icon?.position === "end" ? "flex-row-reverse" : "flex-row"
                } items-center ${error && touched ? "border-failure" : ""}`}
            >
                {icon && (
                    <div className="px-4 text-primary">
                        {icon && typeof icon.val !== "string" && (
                            <icon.val size={18} />
                        )}
                        {icon && typeof icon.val === "string" && icon.val}
                    </div>
                )}
                <input
                    className={`w-full p-2 outline-none px-4`}
                    {...props}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                />
            </div>
            {error && touched && (
                <p id={`${name}-error-msg`} className="text-failure text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Field;
