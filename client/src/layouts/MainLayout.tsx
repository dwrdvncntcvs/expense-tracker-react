import { FC, PropsWithChildren } from "react";
import Navigation from "@components/Navigation";
import { useLocation } from "react-router-dom";
import { useTheme } from "@store/slices/theme";
import { MainLoading } from "@components/LoadingScreen";

interface MainLayoutProps extends PropsWithChildren {
    isLoading: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({ children, isLoading }) => {
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
            {isLoading ? (
                <MainLoading />
            ) : (
                <>
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
                        className={` bg-quaternary ${
                            !shouldExclude
                                ? "h-full w-full overflow-auto py-4"
                                : ""
                        } h-full`}
                    >
                        <main className={`${contentAndHeaderClassName}s`}>
                            {children}
                        </main>
                    </div>
                </>
            )}
        </div>
    );
};

export default MainLayout;
