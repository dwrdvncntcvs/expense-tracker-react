import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";

interface DateFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

const DateField: FC<DateFieldProps> = (props) => {
    const [p1, p2] = useField(props.name || "");

    const { name, onBlur, onChange, value } = p1;
    const { error, touched } = p2;

    return (
        <div
            className={`border rounded-xl w-full overflow-auto flex items-center resize-none h-32 ${
                error && touched ? "border-failure" : ""
            } w-full p-2 outline-none px-4`}
        >
            <input
                type="date"
                {...props}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default DateField;
