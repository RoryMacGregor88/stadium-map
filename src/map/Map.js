import React from 'react';
import './map.css';
import mapboxgl from 'mapbox-gl';
import SideBar from '../sideBar/SideBar';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9yeW1hY2dyZWdvcjg4IiwiYSI6ImNrMWozNndycDA3NTMzaXA3bDBvbHY0dXUifQ.FVuzhYeFcbrlDJTnAUXM3Q';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            map: null,
            showStadiums: true,
            data: null
        }
        this.mapInit = this.mapInit.bind(this);
        this.getData = this.getData.bind(this);
        this.switchThemes = this.switchThemes.bind(this);
        this.toggleStadiums = this.toggleStadiums.bind(this);
        this.flyToSideBarCoords = this.flyToSideBarCoords.bind(this);
    }

    componentDidMount() {
        this.getData();
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

        if (evt.target.name === 'Dark') {
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

    async getData() {
        const data = 'https://api.mapbox.com/datasets/v1/rorymacgregor88/ck1uq4pa806kt2os8ygktg2ar/features?limit=50&access_token=pk.eyJ1Ijoicm9yeW1hY2dyZWdvcjg4IiwiYSI6ImNrMWozNndycDA3NTMzaXA3bDBvbHY0dXUifQ.FVuzhYeFcbrlDJTnAUXM3Q';
         
        const response = await fetch(data);
        const json = await response.json();

        this.setState({data: json})
    }

    flyToSideBarCoords(coords, teamName) {
        const map = this.state.map;

        map.flyTo({
            center: coords,
            zoom: 8.25
        });

        new mapboxgl.Popup({offset: 25})
            .setLngLat(coords)
            .setHTML('<h1>' + teamName + '</h1>')
            .addTo(map)
            .on('close', () => {
                map.flyTo({
                    center: [-1.6394956355722456, 53.29760006104155],
                    zoom: 6.25
                });
            })
        map.setLayoutProperty('stadiums', 'icon-color', '#FFFFFF')
        console.log(
            map.getLayer('stadiums')
        );         
    }

    render() {
        return (
            <div>
                <div className='content-container'>
                    <SideBar
                        switchThemes={this.switchThemes}
                        toggle={this.toggleStadiums}
                        handleSideBarClick={this.flyToSideBarCoords}
                        data={this.state.data}
                    />

                    {/* Entire map goes in this div */}
                    <div className='map-container' ref={div => this.mapContainer = div} />
                </div>
            </div>
        )
    }
}