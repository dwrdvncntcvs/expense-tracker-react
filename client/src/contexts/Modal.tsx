import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
} from "react";

interface IModalContext {
    name: string | null;
    show: (name: string) => void;
    hide: () => void;
}

const ModalContext = createContext<IModalContext>({
    name: "",
    show: () => {},
    hide: () => {},
});

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [modalName, setModalName] = useState<string | null>(null);

    const show = (name: string) => {
        setModalName(name);
    };

    const hide = () => {
        setModalName(null);
    };

    return (
        <ModalContext.Provider value={{ name: modalName, show, hide }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("Cannot use 'useModal' outside of ModalProvider");
    }

    return context;
};

export default ModalProvider;
