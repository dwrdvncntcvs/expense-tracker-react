import type { FC, InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface InputIcon {
    position: "start" | "end";
    val: IconType;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: InputIcon | null;
    err?: {
        has?: boolean;
        value?: string;
    };
}

const Input: FC<InputProps> = ({ icon, err, ...props }) => {
    return (
        <div className="flex flex-col w-full items-end">
            <div
                className={`border rounded-xl w-full overflow-auto flex items-center ${
                    err?.has ? "border-failure" : ""
                }`}
            >
                {icon && (
                    <div className="px-4 text-primary">
                        {icon && <icon.val size={18} />}
                    </div>
                )}
                <input className={`w-full p-2 outline-none `} {...props} />
            </div>
            {err?.has && <p className="text-failure text-sm">{err.value}</p>}
        </div>
    );
};

export default Input;
