import React from 'react';
import ControlContainer from '../controlContainer/controlContainer.component';
import styles from './sideBar.module.css';

export default function SideBar({switchThemes, toggle, data, handleSideBarClick}) {

    let stadiums;
    if(data) {
        stadiums = data.features.map((stadium) => {
            const teamName = stadium.properties.team;
            const coords = stadium.geometry.coordinates;
            return (
                <div 
                    key={stadium.id}
                    className={styles.sidebarDiv}
                    onClick={() => handleSideBarClick(coords, teamName)}
                >
                    <h3 
                        className={styles.sidebarH3}
                        value={teamName}
                    >
                        {teamName}
                    </h3>
                </div>
            )
        })
    } else {
        stadiums = <p>Loading Data...</p>
    }

    return (
        <div className={styles.sidebar}>
            <ControlContainer 
                switchThemes={switchThemes}
                toggle={toggle}    
            />
            <h1 className={styles.sidebarH1}>UK Football Stadiums: </h1>
            {stadiums}
        </div>
    )
}