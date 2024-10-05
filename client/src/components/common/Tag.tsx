import { FC, PropsWithChildren } from "react";
import { HiX } from "react-icons/hi";

interface TagProps extends PropsWithChildren {
    onRemove?: ((id: string) => Promise<void> | void) | undefined;
    id: string;
}

const Tag: FC<TagProps> = ({ children, onRemove, id }) => {
    return (
        <div className="flex items-center gap-2 bg-primary py-1 px-3 text-xs rounded-xl">
            <p className="text-quaternary">{children}</p>
            {onRemove && (
                <button type="button" onClick={() => onRemove(id)}>
                    <HiX className="text-quaternary" />
                </button>
            )}
        </div>
    );
};

export default Tag;
