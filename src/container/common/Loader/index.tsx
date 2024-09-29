import styles from './index.module.scss';

type LoaderProps = {
    isAbsolute?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ isAbsolute }) => {
    return (
        <div className={styles.loader} style={isAbsolute ? { position: "absolute" } : {}}>
            <div className={styles.loader__spinner} />
        </div>
    )
};

export default Loader;