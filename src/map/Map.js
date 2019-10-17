import React from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9yeW1hY2dyZWdvcjg4IiwiYSI6ImNrMWozNndycDA3NTMzaXA3bDBvbHY0dXUifQ.FVuzhYeFcbrlDJTnAUXM3Q';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            map: null
        }
        this.mapInit = this.mapInit.bind(this);
    }

    componentDidMount() {
        this.mapInit();
    }

    mapInit() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/rorymacgregor88/ck1uqgvah0afo1clni9co56yd',
            center: [1.1743, 52.3555],
            zoom: 7.5
        })
        this.setState({map})
    }

    render() {
        return (
            <div 
                ref={div => this.mapContainer = div}
                className='map-container'
            >
            </div>
        )
    }
}