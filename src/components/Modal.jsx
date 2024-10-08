import React from 'react';
import './Modal.css'; // Lägg till stilfil för modal

const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
