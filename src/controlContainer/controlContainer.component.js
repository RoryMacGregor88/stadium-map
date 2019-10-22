import React from 'react';
import styles from './controlContainer.module.css';
import Toggle from '../toggle/toggle.component';
import ThemeButton from '../themeButton/themeButton.component';

export default function ControlContainer({switchThemes, toggle}) {
    return (
        <div className={styles.controlContainer}>
            <Toggle 
                toggle={toggle}
            />
            <ThemeButton
                name='Light' 
                switchThemes={switchThemes}
            />
            <ThemeButton 
                name='Dark'
                switchThemes={switchThemes}
            />
        </div>
    )
}