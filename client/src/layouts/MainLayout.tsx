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
            className={`${name} flex md:flex-col flex-col-reverse h-screen w-screen`}
        >
            {!shouldExclude && (
                <div
                    id="header"
                    className="md:h-22 h-16 w-full bg-quaternary z-30"
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
                    !shouldExclude ? "h-full w-full overflow-auto py-4" : ""
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
