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
            className={`${name} w-screen h-screen overflow-auto bg-quaternary relative`}
        >
            {!shouldExclude && (
                <div
                    id="header"
                    className="md:absolute fixed md:top-0 bottom-0 left-0 w-full md:h-24 md:p-0 h-16 bg-quaternary z-30"
                >
                    <nav
                        className={`${contentAndHeaderClassName}  md:border-none border-t-[1px]`}
                    >
                        <Navigation />
                    </nav>
                </div>
            )}
            <div
                id="content"
                className={`${
                    !shouldExclude ? "md:pt-24 pb-16 pt-4 overflow-auto" : ""
                } h-full`}
            >
                <main className={`${contentAndHeaderClassName} `}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
