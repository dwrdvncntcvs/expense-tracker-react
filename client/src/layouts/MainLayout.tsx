import { FC, PropsWithChildren } from "react";
import Navigation from "../components/Navigation";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const contentAndHeaderClassName = "w-full lg:w-1/2 mx-auto h-full";

    return (
        <div className="w-screen h-screen relative">
            <div id="header" className="absolute top-0 left-0 w-full h-24">
                <nav className={contentAndHeaderClassName}>
                    <Navigation />
                </nav>
            </div>
            <div id="content" className="pt-24 h-full">
                <main className={contentAndHeaderClassName}>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
