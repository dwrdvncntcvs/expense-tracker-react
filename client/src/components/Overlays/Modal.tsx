import { FC, PropsWithChildren } from "react";
import Portal from "./Portal";
import { HiX } from "react-icons/hi";
import { useModal } from "../../contexts/Modal";

interface Option {
    closeCb: () => void;
}

interface ModalProps extends PropsWithChildren {
    name: string;
    title?: string;
    options?: Option;
}

const Modal: FC<ModalProps> = ({ name, title, children, options }) => {
    const _modal = useModal();

    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal");

    const handleClose = () => {
        if (options?.closeCb) {
            options.closeCb();
            return;
        }

        _modal.hide();
    };

    return (
        _modal.name === name && (
            <>
                <Portal element={overlay!}>
                    <div
                        className="fixed top-0 left-0 backdrop-blur-sm bg-black/20 h-screen w-screen z-40"
                        onClick={handleClose}
                    />
                </Portal>
                <Portal element={modal!}>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[500px] z-40 rounded-xl">
                        <div className="p-4 relative">
                            {title && (
                                <h2 className="font-bold text-xl text-primary">
                                    {title}
                                </h2>
                            )}
                            <button
                                className="absolute top-3 right-3 bg-failure text-white p-1 hover:bg-failure/90 rounded-full"
                                onClick={handleClose}
                            >
                                <HiX />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto overflow-x-hidden">
                            {children}
                        </div>
                    </div>
                </Portal>
            </>
        )
    );
};

export default Modal;