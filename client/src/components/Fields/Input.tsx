import type { FC, InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface InputIcon {
    position: "start" | "end";
    val: IconType;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: InputIcon | null;
}

const Input: FC<InputProps> = ({ icon, ...props }) => {
    return (
        <div className="border rounded-xl w-full overflow-auto flex items-center">
            {icon && (
                <div className="px-4 text-primary">
                    {icon && <icon.val size={18} />}
                </div>
            )}
            <input className="w-full p-2 outline-none" {...props} />
        </div>
    );
};

export default Input;
