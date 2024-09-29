import styles from './index.module.scss';
import React from 'react';
import clsx from 'clsx';

type PrimaryButtonProps = {
    text: string;
    onClick?: () => void;
    leftIcon?: React.ReactNode;
    rigthIcon?: React.ReactNode;
    width?: string;
    height?: string;
    variety?: string | 'primary' | 'secondary' | 'terziary' | 'delete';
    submit?: boolean;
    disabled?: boolean;
    className?: string;
    margin?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text = '',
    onClick: action = () => { },
    leftIcon,
    rigthIcon,
    width = 'fit-content',
    height,
    variety = 'primary',
    disabled = false,
    className = '',
    margin,
    ...props
}) => {

    return (
        <button
            {...props}
            className={clsx(styles.custom_button, styles[variety], { [styles.rigth]: rigthIcon }, className)}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                action()
            }}
            style={{ width, height, margin }}
            disabled={disabled}
        >
            {leftIcon}
            {text}
            {rigthIcon}
        </button>
    )
}

export default PrimaryButton;