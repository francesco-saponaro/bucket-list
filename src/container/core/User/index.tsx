import clsx from 'clsx';
import styles from './index.module.scss';
import { useAuthStore } from '@store/storeAuth';
import { USER_COLOR } from '@constants/CONTRACT';

type UserProps = {
    id: number;
    name: string;
    surname: string;
    avatar?: string;
    className?: string;
    label?: string;
    justAvatar?: boolean;
    size?: { width: number, height: number };
    onClick?: () => void;
}

const User: React.FC<UserProps> = ({ id, name, surname, avatar, className, label, justAvatar = false, size, onClick: action }) => {
    const { user } = useAuthStore();
    const getAscii = (value: string) => value?.charCodeAt(0) || 111;

    const currentName = id === user?.id ? user.name : name;
    const currentSurname = id === user?.id ? user.surname : surname;
    
    return (
        <div className={clsx(styles.container, className)} onClick={action}>
            <div className={styles.avatar} style={{ backgroundColor: USER_COLOR[(getAscii(currentName) + getAscii(currentSurname)) % USER_COLOR.length], ...size, cursor: action ? 'pointer' : 'default' }}>
                {avatar
                    ? <img src={avatar} alt='avatar' />
                    : `${currentName ? currentName[0]?.toLocaleUpperCase() : 'X'}${currentSurname ? currentSurname[0]?.toLocaleUpperCase() : 'X'}`
                }
            </div>
            {!justAvatar && <div className={styles.name_section}>
                <div className={styles.currentName} style={{ fontSize: label && '16px' }}>{id === user?.id ? 'Tu' : `${currentName} ${currentSurname}`}</div>
                {label && <div className={styles.label}>{label}</div>}
            </div>}
        </div>
    );
};

export default User;