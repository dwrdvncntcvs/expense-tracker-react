import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface PortalProps extends PropsWithChildren {
    element: Element | DocumentFragment;
}

const Portal: FC<PortalProps> = ({ children, element }) => {
    return createPortal(children, element);
};

export default Portal;
