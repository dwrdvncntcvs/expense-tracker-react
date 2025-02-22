import { FC, PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
    className?: string;
}>;

const Card: FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`border-2 border-secondary bg-secondary text-white rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
};

export default Card