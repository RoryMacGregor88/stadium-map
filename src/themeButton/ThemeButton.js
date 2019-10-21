import React from 'react'

export default function ThemeButton({name, switchThemes}) {
    return (
        <button
            className='button'
            type='radio'
            name={name} 
            onClick={switchThemes}
            >{name} Mode
        </button>
    )
}