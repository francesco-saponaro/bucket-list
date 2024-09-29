import styles from './index.module.scss';
import MailIcon from '@assets/icons/mail.svg';
import LockIcon from '@assets/icons/lock.svg';
import EyeIcon from '@assets/icons/eye.svg';
import AlertIcon from '@assets/icons/alert.svg';
import clsx from 'clsx';
import { useState } from 'react';
import PhoneIcon from '@assets/icons/phone.svg';

type IconType = {
    email: React.ReactNode;
    password: React.ReactNode;
    text: React.ReactNode;
    phone: React.ReactNode;
}

type InputProps = {
    name?: string;
    showIcon?: boolean;
    iconComponent?: React.ReactNode;
    type?: keyof IconType;
    error?: string;
    isWhiteBackground?: boolean;
    isReadOnly?: boolean;
    label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput: React.FC<InputProps> = (
    {
        name = '',
        showIcon = false,
        iconComponent,
        type = 'text',
        error = '',
        isWhiteBackground = false,
        isReadOnly = false,
        label = '',
        onChange,
        ...props
    }
) => {
    const [showPassword, setShowPassword] = useState(false);
    const [current, setCurrent] = useState(props.value || '');

    const icons = {
        email: <MailIcon />,
        password: <LockIcon />,
        text: iconComponent,
        phone: <PhoneIcon />,
    }

    const updateValue = (e: any) => {
        setCurrent(e.target.value);
        onChange?.(e);
    }

    return (
        <div className={clsx(styles.input_container, { [styles.readOnly]: isReadOnly })}>
            {label && <div className={styles.input_label}>{label}</div>}

            <div className={clsx(styles.input_wrapper, { [styles.error]: error })}>
                {!!showIcon && icons[type]}

                <input
                    className={styles.field}
                    onChange={updateValue}
                    value={current}
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    {...props}
                />

                {type === 'password' && (
                    <div className={styles.eye} onClick={() => setShowPassword(!showPassword)}>
                        <EyeIcon />
                    </div>
                )}
            </div>

            {error && (
                <div className={clsx(styles.error_text, { [styles.isWhiteBg]: isWhiteBackground })}>
                    <AlertIcon />
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}

export default CustomInput;