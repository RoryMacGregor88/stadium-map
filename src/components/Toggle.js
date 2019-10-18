import React from 'react'

export default function Toggle({toggle}) {
    const handleClick = () => {
        toggle();
    }
    return (
        <button onClick={handleClick}>Toggle Stadiums</button>
    )
} 