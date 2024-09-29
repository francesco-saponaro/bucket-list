import styles from './index.module.scss'

type SpeechBubbleProps = {
    onClick?: () => void;
    text: string;
};

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
    onClick: action = () => { },
    text
}) => {
    return (
        <div className={styles.speech_bubble}>{text}</div>
    )
}

export default SpeechBubble