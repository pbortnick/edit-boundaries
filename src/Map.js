import React, { Component } from 'react';
import {geojsondata} from './nycneighborhoods'
var map;

class Map extends Component {

  componentDidMount() {
    map = new window.google.maps.Map(document.querySelector('#map'), {
      zoom: 14,
      center: {lat: 40.758745, lng: -73.952642 }
    });

    map.data.addGeoJson(JSON.parse(geojsondata));
    map.data.setStyle({ fillColor: 'green', strokeWeight: 1 });
  }
  render() {
    return (
      <div className="map-wrapper">
        <div id="map">
        </div>
      </div>
    );
  }
}

export default Map;
