import React from 'react';
import styles from './map.module.css';
import mapboxgl from 'mapbox-gl';
import SideBar from '../sideBar/sideBar.component';
// import Popup from '../popup/popup.compopnent';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9yeW1hY2dyZWdvcjg4IiwiYSI6ImNrMWozNndycDA3NTMzaXA3bDBvbHY0dXUifQ.FVuzhYeFcbrlDJTnAUXM3Q';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            data: null,
            center: [-2.539, 52.997],
            zoom: 6.5,
            datasetId: 'ck1uq4pa806kt2os8ygktg2ar'
        }
        this.mapInit = this.mapInit.bind(this);
        this.getData = this.getData.bind(this);
        this.switchThemes = this.switchThemes.bind(this);
        this.toggleDatasets = this.toggleDatasets.bind(this);
        this.flyToSideBarCoords = this.flyToSideBarCoords.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.mapInit();
        console.log('LOADED')
    }

    mapInit() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/rorymacgregor88/ck22020az0vx51cms63r4589q',
            center: this.state.center,
            zoom: this.state.zoom
        })

        // -79.169, 35.928

        map.on('load', () => {
            this.setState({map})

            map.on('click', 'stadiums',  (evt) => {
                const features = map.queryRenderedFeatures(evt.point);

                new mapboxgl.Popup({
                    offset: 25,
                    // className: 'popup'
                })
                .setLngLat(evt.lngLat)
                .setHTML('<h3>' + features[0].properties.team + '</h3>')
                .addTo(map);
            })

            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }));

            map.addControl(new mapboxgl.FullscreenControl({
                container: this.mapContainer
            }));
        })
    }

    toggleDatasets() {
        this.setState({
            datasetId: 'ck21yas0t0wck2omq93bm16g8',
            center: [-79.169, 35.928],
            zoom: 10
        })
        console.log('Working!');
        //update sidebar map
        //some kind of bool to say which dataset it is
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
            map.setStyle('mapbox://styles/rorymacgregor88/ck22020az0vx51cms63r4589q')
        }
    }

    async getData() {
        const data = `https://api.mapbox.com/datasets/v1/rorymacgregor88/${this.state.datasetId}/features?limit=100&access_token=pk.eyJ1Ijoicm9yeW1hY2dyZWdvcjg4IiwiYSI6ImNrMWozNndycDA3NTMzaXA3bDBvbHY0dXUifQ.FVuzhYeFcbrlDJTnAUXM3Q`;

        //ck1uq4pa806kt2os8ygktg2ar stadiums
        // ck21yas0t0wck2omq93bm16g8 crashes

        const response = await fetch(data);
        const json = await response.json();

        this.setState({data: json})
    }

    flyToSideBarCoords(coords, teamName) {
        const map = this.state.map;

        map.easeTo({
            center: coords,
            zoom: 9.25,
            pitch: 75,
            rotation: 20
        });

        new mapboxgl.Popup({
            offset: 25,
            // className: 'popup'
        })
        .setLngLat(coords)
        .setHTML('<h1>' + teamName + '<h1/>')
        .addTo(map)
        .on('close', () => {
            map.easeTo({
                center: [-1.6394956355722456, 53.29760006104155],
                zoom: 6.25,
                pitch: 0,
                rotation: 0
            });
        })     
    }

    render() {
        return (
            <div>
                <div className={styles.contentContainer}>
                    <SideBar
                        switchThemes={this.switchThemes}
                        toggle={this.toggleDatasets}
                        handleSideBarClick={this.flyToSideBarCoords}
                        data={this.state.data}
                    />

                    {/* Entire map goes in this div */}
                    <div className={styles.mapContainer} ref={div => this.mapContainer = div} />
                </div>
            </div>
        )
    }
}