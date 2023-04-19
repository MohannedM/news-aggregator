import React from 'react';
import {Modal, Button} from 'react-bootstrap';

interface BaseModalProps {
    handleCloseModal(): void 
    error?: string | null,
}

const BaseModal: React.FC<BaseModalProps> = ({ handleCloseModal, error }) => {
    return(
        <React.Fragment>
            <Modal show={error ? true : false} onHide={handleCloseModal} animation={false}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default BaseModal;