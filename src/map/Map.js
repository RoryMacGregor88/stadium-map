import React from 'react';
import './map.css';
import mapboxgl from 'mapbox-gl';
import Toggle from '../toggle/Toggle'

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9yeW1hY2dyZWdvcjg4IiwiYSI6ImNrMWozNndycDA3NTMzaXA3bDBvbHY0dXUifQ.FVuzhYeFcbrlDJTnAUXM3Q';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            map: null,
            showStadiums: true
        }
        this.mapInit = this.mapInit.bind(this);
        this.switchThemes = this.switchThemes.bind(this);
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

            map.on('click', 'stadiums',  (evt) => {
                const features = map.queryRenderedFeatures(evt.point);
                console.log(features)

                new mapboxgl.Popup({offset: 25})
                    .setLngLat(evt.lngLat)
                    .setHTML('<h1>' + features[0].properties.team + '</h1>')
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

    switchThemes(evt) {
        const map = this.state.map;

        if (evt.target.name === 'dark') {
            map.setStyle('mapbox://styles/rorymacgregor88/ck1w2muag09d11cs2dbosj01f');
            map.on('load', () => {
                map.addLayer({
                    id: 'stadiums',
                    source: {
                      type: 'vector',
                      url: 'rorymacgregor88.ck1uq4pa806kt2os8ygktg2ar-5aobc'
                    }
                })
            })
        } else {
            map.setStyle('mapbox://styles/rorymacgregor88/ck1uqgvah0afo1clni9co56yd')
        }
    }

    render() {
 
        return (
            <div>
                <Toggle 
                    toggle={this.toggleStadiums}
                />
                <div className='menu'>
                    <button
                        name='light' 
                        type='radio'
                        onClick={this.switchThemes}
                        >Light Mode
                    </button>
                    <button 
                        name='dark'
                        type='radio'
                        onClick={this.switchThemes}
                        >Dark Mode
                    </button>
                </div>
                <div 
                    ref={div => this.mapContainer = div}
                    className='map-container'
                >
                </div>
            </div>
        )
    }
}