import React from 'react';

const ConfirmModal = ({ modalData, closeModal, confirm, children }) => {

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    {children}
                    <div className="modal-action gap-2">
                        <label onClick={() => confirm(modalData)} htmlFor="confirm-modal" className="btn btn-sm hover:btn-error">Yes</label>
                        <label onClick={() => closeModal(null)} htmlFor="confirm-modal" className="btn btn-sm btn-outline">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;