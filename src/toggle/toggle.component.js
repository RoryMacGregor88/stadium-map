import React from 'react'
import styles from './toggle.module.css';

export default function Toggle({toggle}) {
    const handleClick = () => {
        toggle();
    }
    return (
        <button
            className={styles.button} 
            onClick={handleClick}
            >Toggle Stadiums
        </button>
    )
} 