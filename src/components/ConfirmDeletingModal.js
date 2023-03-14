
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmDeletingModal = ({ isOpen, item, onAccept, onCancel }) => {
    if(item === null) {
        return;
    }
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Видалення файлу { item.key }</ModalHeader>
            <ModalBody>
                <p>Цю дію не можна відминити.</p>
                <p>Ви впевнені, що хочете видалити файл?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={ onAccept }>Видалити</Button>{' '}
                <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmDeletingModal;