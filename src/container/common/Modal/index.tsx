import styles from './index.module.scss'
import { useRef } from 'react';
import useOutsideClick from '@hooks/useOutsideClick';
import clsx from 'clsx';

type ModalProps = {
    modalState: boolean;
    setModalState: (state: boolean) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalState, setModalState, children }) => {
    const formRef = useRef<HTMLDivElement>(null);
    useOutsideClick(formRef, () => {
        if (modalState) {
            setModalState(false);
        }
    });

    return (
        <div className={clsx(styles.modal, { [styles.open]: modalState })}>
            <div className={styles.modal__overlay} />
            <div className={styles.modal__container} ref={formRef}>
                {children}
            </div>
        </div>
    )
}

export default Modal