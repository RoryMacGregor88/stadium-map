import React from 'react';
import mapboxgl from 'mapbox-gl';
import ControlContainer from '../controlContainer/ControlContainer';
import './sideBar.css';

export default function Sidebar({switchThemes, toggle, data, map}) {

    const handleClick = (coords, team) => {
        map.flyTo({
            center: coords,
            zoom: 8
        });
        new mapboxgl.Popup({offset: 25})
            .setLngLat(coords)
            .setHTML('<h1>' + team + '</h1>')
            .addTo(map);
    }

    if(data) {
        var stadiums = data.features.map((stadium) => {
            const team = stadium.properties.team;
            const coords = stadium.geometry.coordinates;
            return (
                <div 
                    key={stadium.id}
                    onClick={() => handleClick(coords, team)}
                >
                    <h3 value={team}>{team}</h3>
                </div>
            )
        })
    } else {
        return<p>Loading Data...</p>
    }

    return (
        <div className='sidebar'>
            <ControlContainer 
                switchThemes={switchThemes}
                toggle={toggle}    
            />
            <h1>UK Football Stadiums: </h1>
            {stadiums}
        </div>
    )
}