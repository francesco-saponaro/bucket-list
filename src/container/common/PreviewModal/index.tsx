import styles from './index.module.scss'
import { FileData } from '@store/storeLoadedPdf';
import { DocumentData } from '@store/storeAuth';
import clsx from 'clsx';

interface Props {
    src?: FileData[] | DocumentData[] | null;
}

const PreviewModal: React.FC<Props> = ({ src }) => {
    return (
        <>
            {src &&
                <div className={clsx(styles.preview_modal, { [styles.single]: src.length < 2 })} style={{ justifyContent: src && src?.length < 2 ? "center" : "start" }}>
                    {src.map((file, index) => (
                        <div key={index} className={styles.preview_modal__photo}><img src={file.url} /><p>{file?.name}</p></div>
                    ))}
                </div>
            }
        </>
    )
}

export default PreviewModal