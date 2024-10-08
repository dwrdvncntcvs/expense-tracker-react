import { FC, PropsWithChildren } from "react";
import Navigation from "@components/Navigation";
import { useLocation } from "react-router-dom";
import { useTheme } from "@store/slices/theme";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const { name } = useTheme();

    const excludeNavigationFromPath = [
        "/sign-in",
        "/sign-up",
        "/forgot-password",
    ];
    const shouldExclude = excludeNavigationFromPath.includes(location.pathname);

    const contentAndHeaderClassName =
        "w-full px-4 xl:w-[1200px] mx-auto h-full";

    return (
        <div
            className={`${name} w-screen h-screen relative overflow-auto bg-quaternary`}
        >
            {!shouldExclude && (
                <div id="header" className="absolute top-0 left-0 w-full h-24">
                    <nav className={contentAndHeaderClassName}>
                        <Navigation />
                    </nav>
                </div>
            )}
            <div
                id="content"
                className={`${!shouldExclude ? "pt-24" : ""} h-full`}
            >
                <main className={contentAndHeaderClassName}>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
