import { ButtonHTMLAttributes, useEffect, useState, useRef, useCallback } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

type ChatProps = {
    onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ChatButton: React.FC<ChatProps> = ({ onClick: action }) => {
    const [isInactive, setIsInactive] = useState(false);
    const chatButtonRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleShakeInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setIsInactive(true);
            setTimeout(() => {
                setIsInactive(false);
            }, 1500);
        }, 6500);
    }, []);

    const resetInactivityTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            handleShakeInterval();
        }, 20000);
    }, [handleShakeInterval]);

    const handleButtonClick = () => {
        if (window.$crisp) {
            resetInactivityTimeout();
            window.$crisp.push(['do', 'chat:show']);
            window.$crisp.push(['do', 'chat:open']);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            resetInactivityTimeout();
        };

        const closestContainerElement = chatButtonRef.current?.closest(".container");
        closestContainerElement?.addEventListener('scroll', handleScroll);

        // Start the inactivity timeout when the component mounts
        resetInactivityTimeout();

        return () => {
            closestContainerElement?.removeEventListener('scroll', handleScroll);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [resetInactivityTimeout]);

    return (
        <div className={clsx(styles.tooltip_button_container, { [styles.shake]: isInactive })} ref={chatButtonRef}>
            <button
                className={styles.tooltip_button}
                onClick={() => {
                    if (action) {
                        action();
                    } else {
                        handleButtonClick();
                    }
                }}
            >
                Chatta
            </button>
            <div className={styles.tooltip_arrow} />
        </div>
    );
};

export default ChatButton;