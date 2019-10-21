import React from 'react'
import './toggle.css';

export default function Toggle({toggle}) {
    const handleClick = () => {
        toggle();
    }
    return (
        <button
            className='button' 
            onClick={handleClick}
            >Toggle Stadiums
        </button>
    )
} 