import React from 'react'
import Toggle from '../toggle/Toggle';
import ThemeButton from '../themeButton/ThemeButton';

export default function ControlContainer({switchThemes, toggle}) {
    return (
        <div className='controls-container'>
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