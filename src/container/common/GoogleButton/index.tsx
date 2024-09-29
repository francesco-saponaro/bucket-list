import styles from './index.module.scss';
import GoogleIcon from '@assets/icons/google.svg';

type PrimaryButtonProps = {
    onClick: () => void;
    width?: string;
}

const GoogleButton: React.FC<PrimaryButtonProps> = ({
    onClick: action = () => { },
}) => {

    return (
        <button className={styles.google_button} onClick={() => action()}>
            <GoogleIcon />
            Continua con Google
        </button>
    )
}

export default GoogleButton;