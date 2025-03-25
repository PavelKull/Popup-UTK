import React, {  useState } from 'react';
import { LoanCalculator } from '../../components/LoanCalculator';
import MainButton from '../../ui-kit/MainButton/MainButton';
import Modal from '../../ui-kit/Modal/Modal';

import styles from './Popup.module.scss';

const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.popupWrapper} ${isOpen && styles.popupOpen}`}>
            <MainButton
                type="primary"
                size="big"
                onClick={() => setIsOpen(true)}
                text="Расчет платежей"
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <LoanCalculator handleClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default Popup;
