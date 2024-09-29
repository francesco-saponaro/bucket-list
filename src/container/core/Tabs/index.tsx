// Tab.tsx
import React, { useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

type TabProps = {
  label: string;
  content: React.ReactNode;
  onClick?: () => void;
}

type TabsProps = {
  tabs: TabProps[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab, className }) => {

  return (
    <div className={clsx(styles.tabs_container, className)}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
            <button
                key={index}
                className={clsx(styles.tab_button, { [styles.tab_button_active]: index === activeTab })}
                onClick={() => setActiveTab(index)}
            >
                {tab.label}
            </button>
        ))}
      </div>
      <div className={styles.content}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
