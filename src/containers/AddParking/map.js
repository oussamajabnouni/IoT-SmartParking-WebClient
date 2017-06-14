/* eslint-disable no-undef */
import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from  "react-google-maps";
import SearchBox from "react-google-maps/lib/places/SearchBox"
const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `60%`,
  height: `32px`,
  marginTop: `21px`,
  padding: `0 12px`,
  borderRadius: `24px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  left:`159px`
};

const SearchBoxExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    onClick={props.onMapClick}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Search a place..."
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));

export default class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bounds: null,
            center: {
            lat: 36.8064948,
            lng: 10.1815316,
            },
            markers: [],
        };

        this.handleMapMounted = (map) => {
            this._map = map;
        }

        this.handleBoundsChanged= () => {
            this.setState({
            bounds: this._map.getBounds(),
            center: this._map.getCenter(),
            });
        }

        this.handleSearchBoxMounted = (searchBox) => {
            this._searchBox = searchBox;
        }

        this.handlePlacesChanged = () => {
            const places = this._searchBox.getPlaces();

            // Add a marker for each place returned from search bar
            const markers = places.map(place => ({
            position: place.geometry.location,
            }));

            // Set markers; set map center to first search result
            const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

            this.setState({
            center: mapCenter,
            });
          }
          this.handleMapClick = (event)=> {
            this.state.markers.pop()
            this.props.handlePosition(event.latLng)
            this.setState({
              markers: [
                ...this.state.markers,
                { position: event.latLng },
              ],
            });
          }
        
    }

  componentDidMount() {
    if(this.props.position){
         this.setState({
            center: this.props.position,
         });
          this.setState({
            markers: [
              ...this.state.markers,
              { position: this.props.position },
            ],
          });
    }else{
     navigator.geolocation.getCurrentPosition((position) =>{
        const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
         this.setState({
            center: pos,
         });
      })
    }
  }
  

  render() {
    return (
      <SearchBoxExampleGoogleMap
        containerElement={
          <div style={{ height: this.props.position?`270px`:`350px` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        onMapMounted={this.handleMapMounted}
        onBoundsChanged={this.handleBoundsChanged}
        onSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
        markers={this.state.markers}
        onMapClick={this.handleMapClick}
      />
    );
  }
}