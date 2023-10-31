import React from 'react';

const DeleteConfirmationModalProd = ({ show, onClose, onConfirm, onDelete }) => {
    return (

        <div className="modal fade" id="verticalycenteredDeleteProduct" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this product?
                    </div>
                    <div className="modal-footer">
                        <button data-bs-dismiss="modal" type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button data-bs-dismiss="modal" type="button" className="btn btn-danger" onClick={onDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModalProd;
