import styles from './index.module.scss';
import Success from "@assets/icons/success.svg";
import Error from "@assets/icons/error.svg";
import clsx from 'clsx';

interface InfoTooltipProps {
    text: string;
    isError?: boolean;
}


const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, isError }) => {
    return (
        <div className={clsx(styles.info_tooltip, { [styles.error]: isError })}>
            <div className={styles.info_tooltip__header}>
                <div className={styles.info_tooltip__header__icon}>
                    {isError ? <Error /> : <Success />}
                </div>
                <div className={styles.info_tooltip__header__text}>{text}</div>
            </div>
        </div>
    )
}

export default InfoTooltip