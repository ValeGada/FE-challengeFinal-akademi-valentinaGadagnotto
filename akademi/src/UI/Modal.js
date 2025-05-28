import React from "react";
import ReactDOM from 'react-dom';
import { OverlayDiv, ContentDiv } from "../styles";


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <OverlayDiv onClick={onClose}>
            <ContentDiv onClick={(e) => e.stopPropagation()}>
                {children}
            </ContentDiv>
        </OverlayDiv>,
    document.getElementById("modal-root")
    );
}

export default Modal;