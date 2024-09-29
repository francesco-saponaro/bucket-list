import styles from './index.module.scss'
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import CircleButton from '@core/CircleButton';
// import Avatar from '@core/Avatar';
// import defaultImg from '@assets/images/default.png';
import ROUTES from '@routes/constants';
import ChatButton from '@core/ChatButton';
import User from '@core/User';
import { useAuthStore } from '@store/storeAuth';
import clsx from 'clsx';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useAuthStore();

    return (
        <div className={styles.page}>
            <div className={clsx(styles.container, "container")}>
                <div className={styles.nav}>
                    <div className={styles.nav__back_btn}>
                        <CircleButton callback={() => navigate(pathname === "/profile/modify" ? `${ROUTES.PROFILE}/${ROUTES.PROFILE_DETAILS}` : ROUTES.HOME)} isBack={true} />
                    </div>
                    <div className={styles.title}>Profilo</div>
                    <ChatButton />
                </div>
                {user ? <User name={user.name} surname={user.surname} id={user.id} justAvatar={true} size={{ width: 80, height: 80 }} /> : null}
                {/* <Avatar url={defaultImg} className={styles.avatar_custom} /> */}
                <Outlet />
                <div className={styles.version}>
                    {process.env.VERSION}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage