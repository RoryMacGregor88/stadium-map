import React from 'react';
import ControlContainer from '../controlContainer/ControlContainer';
import './sideBar.css';

export default function Sidebar({switchThemes, toggle, data, handleSideBarClick}) {

    let stadiums;
    if(data) {
        stadiums = data.features.map((stadium) => {
            const teamName = stadium.properties.team;
            const coords = stadium.geometry.coordinates;
            return (
                <div 
                    key={stadium.id}
                    className='sidebar-div'
                    onClick={() => handleSideBarClick(coords, teamName)}
                >
                    <h3 
                        className='sidebar-h3'
                        value={teamName}
                    >
                        {teamName}
                    </h3>
                </div>
            )
        })
    } else {
        stadiums =<p>Loading Data...</p>
    }

    return (
        <div className='sidebar'>
            <ControlContainer 
                switchThemes={switchThemes}
                toggle={toggle}    
            />
            <h1 className='sidebar-h1'>UK Football Stadiums: </h1>
            {stadiums}
        </div>
    )
}