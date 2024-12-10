import { Logo } from "@components/Svgs";
import { FC } from "react";

const MainLoading: FC = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Logo size="default" />
        </div>
    );
};

export default MainLoading;
