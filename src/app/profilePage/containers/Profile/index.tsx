import styles from '../../index.module.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleButton from '@core/CircleButton';
import IconButton from '@core/IconButton';
import LogoutIcon from '@assets/icons/logout.svg';
import BinIcon from '@assets/icons/bin.svg';
import clsx from 'clsx';
import ROUTES from '@routes/constants';
import { useAuthStore } from '@store/storeAuth';
import Modal from '@common/Modal';
import CustomModal from '@common/CustomModal';
import useApiHoc from '@hooks/useApiHoc';

const Profile = () => {
    const { userLogOut, user, deleteUser } = useAuthStore();
    const navigate = useNavigate();
    const apiHoc = useApiHoc();
    const [isDeleteAccount, setIsDeleteAccount] = useState(false);

    const handleDeleteAccount = () => {
        apiHoc(() => deleteUser());
        setIsDeleteAccount(false);
    }

    return (
        <>
            <div className={styles.content}>
                <div className={clsx(styles.content__personal, styles.card)} onClick={() => navigate(`${ROUTES.PROFILE}/${ROUTES.PROFILE_MODIFY}`)}>
                    <div className={styles.title}>Dati personali</div>
                    <div>{user?.name} {user?.surname}</div>
                    <div>{user?.phone}</div>
                    <div className={styles.title}>E-mail</div>
                    <div>{user?.email}</div>
                    <div className={styles.content__personal__cta}>
                        Modifica informazioni
                        <CircleButton />

                    </div>
                </div>
                <a href="https://www.misterbolletta.it/docs/Informativa-privacy-dic-2021-f-DEF.pdf" target="_blank" className={clsx(styles.content__privacy_cta, styles.card)}>
                    <span className={styles.title}>Privacy policy</span>
                    <CircleButton />
                </a>
                <div className={clsx(styles.content__logout_cta, styles.card)} onClick={() => userLogOut()}>
                    <span className={styles.title}>Esci</span>
                    <IconButton icon={<LogoutIcon />} backgroundColor='#D9EEFF' />
                </div>
                <Modal modalState={isDeleteAccount} setModalState={setIsDeleteAccount} children={
                    <CustomModal
                        title="Sei sicuro di voler eliminare il tuo account?"
                        textAction='Elimina'
                        buttonVariety='delete'
                        closeModal={() => setIsDeleteAccount(false)}
                        action={handleDeleteAccount}
                    />
                } />
            </div>
            <div className={styles.delete_cta} onClick={(e) => {
                e.stopPropagation()
                setIsDeleteAccount(true)
            }}>
                <span className={styles.title}>Elimina account</span>
                {/* <IconButton icon={<BinIcon />} type="delete" /> */}
            </div>
        </>
    )
}

export default Profile