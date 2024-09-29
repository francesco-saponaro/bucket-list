import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import LogoSliceYellow from '@assets/images/logo-slice-yellow.svg';
import LogoSliceAzure from '@assets/images/logo-slice-azure.svg';
import LogoSliceWhite from '@assets/images/logo-slice-white.svg';

type SplashProps = {
    isLoading: boolean;
};

const Splash: React.FC<SplashProps> = ({ isLoading }) => {
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [timePassed, setTimePassed] = useState(false);

    // This effect sets timePassed to true after 4 seconds
    // It waits for the css animation to be over
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimePassed(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    // This effect sets the opacity to 0 and display to none after timePassed is true and loading is done
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (!isLoading && timePassed) {
            setOpacity(0);
            timeout = setTimeout(() => {
                setVisible(false);
            }, 1000);
        } else if (isLoading) {
            setVisible(true);
            setOpacity(1);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isLoading, timePassed]);
    ;


    return (
        <div className={styles.splash} style={{ display: visible ? 'flex' : 'none', opacity: opacity }}>
            <div className={styles.splash__logo}>
                <div className={styles.splash__logo__container}>
                    <LogoSliceYellow />
                    <LogoSliceAzure />
                    <LogoSliceWhite />
                </div>
            </div>
        </div>
    )
};

export default Splash;