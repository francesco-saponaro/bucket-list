import styles from './index.module.scss';
import Freccia from '@assets/icons/freccia.svg';
import clsx from 'clsx';

interface CircleButtonProps {
    callback?: () => void;
    isBack?: boolean;
    isDown?: boolean;
}

const CircleButton: React.FC<CircleButtonProps> = ({ callback, isBack = false, isDown = false }) => {
    return (
        <div className={clsx(styles.circle_button, { [styles.is_back]: isBack }, { [styles.is_down]: isDown })} onClick={callback}><Freccia /></div>
    )
}

export default CircleButton