import clsx from 'clsx';
import styles from './index.module.scss';

type AvatarProps = {
    url: string;
    className?: string;
    onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ url, className, onClick: action = () => { }, }) => {
    return (
        <div className={clsx(styles.avatar, className)} onClick={action}>
            <img src={url} alt='avatar' />
        </div>
    );
};

export default Avatar;