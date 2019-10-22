import React from 'react';
import styles from './themeButton.module.css';

export default function ThemeButton({name, switchThemes}) {
    return (
        <button
            className={styles.button}
            type='radio'
            name={name} 
            onClick={switchThemes}
            >{name} Mode
        </button>
    )
}