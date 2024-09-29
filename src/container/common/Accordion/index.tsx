import styles from './index.module.scss';
import React, { useState } from 'react';
import clsx from 'clsx';
import UpArrow from '@assets/icons/arrow-up.svg';


type AccordionProps = {
    children: React.ReactNode[];
    title: string;
    isOpen: boolean;
    variety?: 'father' | 'child';
    onClick?: () => void;
    padding?: string;
};

const Accordion: React.FC<AccordionProps> = ({ children = [], title = 'Father accordion', isOpen = false, variety = 'father', onClick: onAction = () => { }, padding }) => {
    const [isOpenState, setIsOpenState] = useState(isOpen);

    return (
        <details
            className={clsx(styles.accordion, styles[variety])}
            open={isOpen}
            onClick={(e) => {
                e.stopPropagation();
                setIsOpenState((prev) => !prev);
                onAction?.();
            }}
            style={{ padding }}>
            <summary>
                <h2>{title}</h2>
                <div className={clsx(styles.icon, { [styles.icon_open]: !isOpenState })}><UpArrow /> </div>
            </summary>
            {children?.map((child, index) => {
                return (
                    <div
                        key={`${child}-${index}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className={
                            clsx(
                                { [styles.divider]: index < children.length - 1 },
                            )
                        }
                    >
                        {child}
                    </div>
                )

            })}
        </details>
    )

}

export default Accordion;