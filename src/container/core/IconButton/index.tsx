import styles from './index.module.scss';
import React, { FC } from 'react';
import clsx from 'clsx';

type IconButtonProps = {
    onClick?: () => void;
    icon?: React.ReactNode;
    isRotate?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
    onClick: action = () => { },
    icon,
    isRotate = false
}) => {

    return (
        <div className={clsx(styles.button, { [styles.rotate]: isRotate })}
            onClick={action}>
            {icon}
        </div>
    )
}

export default IconButton;