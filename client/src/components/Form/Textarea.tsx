import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: FC<TextareaProps> = (props) => {
    const [p1, p2] = useField(props.name || "");

    const { name, onBlur, onChange, value } = p1;
    const { error, touched } = p2;

    return (
        <textarea
            className={`border rounded-xl w-full overflow-auto flex items-center resize-none h-32 ${
                error && touched ? "border-failure" : ""
            } w-full p-2 outline-none px-4`}
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
        />
    );
};

export default Textarea;
