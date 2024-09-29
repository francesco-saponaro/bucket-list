import styles from './index.module.scss';
import Bucket from "../../../public/assets/icons/bucket.svg";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.bucket}>
                <Bucket />
            </div>
        </div>
    );
};

export default Loader;
