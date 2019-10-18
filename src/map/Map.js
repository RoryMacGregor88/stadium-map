import React from 'react';
import './map.css';
import mapboxgl from 'mapbox-gl';
import Toggle from '../components/Toggle'

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9yeW1hY2dyZWdvcjg4IiwiYSI6ImNrMWozNndycDA3NTMzaXA3bDBvbHY0dXUifQ.FVuzhYeFcbrlDJTnAUXM3Q';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            map: null,
            showStadiums: true
        }
        this.mapInit = this.mapInit.bind(this);
        this.toggleStadiums = this.toggleStadiums.bind(this);
    }

    componentDidMount() {
        this.mapInit();
    }

    mapInit() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/rorymacgregor88/ck1uqgvah0afo1clni9co56yd',
            center: [-1.6394956355722456, 53.29760006104155],
            zoom: 6.25
        })

        map.on('load', () => {

            this.setState({map})

            map.on('click', (evt) => {

                const feature = map.queryRenderedFeatures(evt.point);

                new mapboxgl.Popup({offset: 25})
                    .setLngLat(evt.lngLat)
                    .setHTML('<h1>' + 'Team: ' + feature[0].properties.team + '</h1>')
                    .addTo(map);
            })
        })
    }

toggleStadiums() {
    const map = this.state.map;
    this.state.showStadiums
    ? map.setLayoutProperty('stadiums', 'visibility', 'none') 
    : map.setLayoutProperty('stadiums', 'visibility', 'visible');

    this.setState({showStadiums: !this.state.showStadiums});
}

    render() {
 
        return (
            <div>
                {/* I only made the toggle button into a component to see if it was possble. */}
                <Toggle 
                    toggle={this.toggleStadiums}
                />
                <div 
                    ref={div => this.mapContainer = div}
                    className='map-container'
                >
                </div>
            </div>
        )
    }
}