import React from 'react';
import styles from './index.module.scss';
import CrossIcon from '@assets/icons/cross.svg';
import PrimaryButton from '@core/PrimaryButton';

type CustomModalProps = {
    title: string;
    description?: string;
    hasCloseButton?: boolean;
    closeModal?: () => void;
    textAction?: string;
    action?: () => void;
    buttonVariety?: string;
    secondTextAction?: string;
    secondAction?: () => void;
    secondButtonVariety?: string;
    image?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
    title,
    description,
    hasCloseButton = true,
    closeModal = () => { },
    textAction,
    action = () => { },
    buttonVariety = 'primary',
    secondTextAction,
    secondAction = () => { },
    secondButtonVariety = 'secondary',
    image
}) => {
    return (
        <div className={styles.container}>
            {hasCloseButton && <div className={styles.close_btn} onClick={closeModal}><CrossIcon /></div>}
            {image ? image : null}
            <div className={styles.content}>
                <h2>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.ctas}>
                {textAction && <PrimaryButton text={textAction} onClick={action} className={styles.action} variety={buttonVariety} />}
                {secondTextAction && <PrimaryButton text={secondTextAction} onClick={secondAction} className={styles.action} variety={secondButtonVariety} />}
            </div>
        </div>
    )
}

export default CustomModal;