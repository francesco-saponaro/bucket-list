import styles from './index.module.scss';
import { signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@routes/constants';
import clsx from 'clsx';
import Heart from '@assets/icons/hearth.svg';
import SettingsIcon from '@assets/icons/settings.svg';
import LogoutIcon from '@assets/icons/logout.svg';
import IconButton from '@core/IconButton';
import useFirebase from '@hooks/useFirebase';
import { useAuthStore } from '@store/storeAuth';
import { useObjectivesStore } from '@store/storeObjectives'; // Import Zustand store for objectives
import { useStoreLoader } from '@store/storeLoader'; // Import loader store
import alertToast from "@core/AlertToast";
import { doc, getDoc } from 'firebase/firestore';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { auth, db } = useFirebase();
    const { user } = useAuthStore();

    // Zustand states and actions
    const { results, objectives, fetchSearchResults, setObjectives } = useObjectivesStore();
    const { setLoaderQuery, stopLoader, startLoader } = useStoreLoader();
    const [isLoved, setIsLoved] = useState(false);
    console.log(results, 'results')

    useEffect(() => {
        if (user && db) {
            const fetchObjectives = async () => {
                const userDocRef = doc(db, 'users', user.uid); // Reference to the user's document
                const docSnap = await getDoc(userDocRef); // Fetch the user's document from Firestore

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setObjectives(data.selected || []); // Populate state with Firestore data if it exists
                }
            };

            fetchObjectives();
        }
    }, [user, db]);

    // Trigger fetch of results on component mount if objectives exist
    useEffect(() => {
        console.log(objectives, 'objectives')
        if (objectives.length > 0 && results.length === 0) {
            setLoaderQuery(true);
            startLoader();

            try {
                fetchSearchResults(objectives, () => {
                    console.log('Search results fetched');
                    if (!results.length) {
                        alertToast(
                            "error",
                            "No results found",
                        );
                    }

                    stopLoader();
                    setLoaderQuery(false);
                });
            } catch (error) {
                console.error('Error fetching results:', error);
                stopLoader();
                setLoaderQuery(false);
            }
        }
    }, [objectives]);

    return (
        <section className={styles.page}>
            {/* Settings and Logout Buttons */}
            <div className={styles.settings_btn}>
                <IconButton
                    onClick={() => navigate(ROUTES.SELECT)}
                    icon={<SettingsIcon />}
                    isRotate={true}
                />
            </div>
            <div className={styles.logout_btn}>
                <IconButton
                    onClick={() => signOut(auth).then(() => logout())}
                    icon={<LogoutIcon />}
                />
            </div>

            <div className={styles.container}>
                <h1 className={styles.header}>
                    I tuoi obiettivi {/* Your objectives in Italian */}
                </h1>

                {/* Display search results */}
                {results.map((result: any, index: number) => (
                    <div
                        key={index}
                        className={styles.card}
                        style={{
                            backgroundImage: `url(${result.image || 'https://via.placeholder.com/300'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Like button */}
                        <div
                            className={clsx(styles.love, { [styles.loved]: isLoved })}
                            onClick={() => setIsLoved((prev) => !prev)}
                        >
                            <Heart />
                        </div>

                        {/* Title and Link */}
                        <div className={styles.content}>
                            <h2 className={styles.title}>{result.title}</h2>
                            <a href={result.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Home;
