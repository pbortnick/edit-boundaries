import React, { Component } from 'react';
var map;

class Map extends Component {

  state: {
    currentPolygon: '',
    currentHood: '',
    setCoords: []
  }

  handleButton = () => {
    var data = {
      coords: this.state.setCoords,
      hood: this.state.currentHood
    }

    fetch('/data/set?hood=' + data.hood + '&coords=' + data.coords)
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        this.setState({
          errors: {}
        });
      } else {
        this.setState({
          errors: "ERROR"
        });
      }
    })
  }

  componentDidMount() {
    map = new window.google.maps.Map(document.querySelector('#map'), {
      zoom: 14,
      center: {lat: 40.758745, lng: -73.952642 }
    });

    fetch('/data')
    .then(res => res.json())
    .then(function(response) {
      map.data.addGeoJson(response);
    })

    map.data.setStyle({
      fillColor: 'green',
      strokeWeight: 1,
      clickable: true
    });

    var t = this

    map.data.addListener('click', function(event) {
      t.setState({ currentPolygon: event, currentHood: event.feature.getProperty('Name')})
      document.querySelector('.selection-name').textContent =
      event.feature.getProperty('Name');
      // var shape = event.feature.getGeometry()
      var shape = [];
      for (var i = 0; i < event.feature.getGeometry().getLength(); i++) {
        var shapeData = event.feature.getGeometry().getAt(i).getArray();
        shape.push(shapeData);
      }
      var nowEditingShape = new window.google.maps.Polygon({
        paths: shape,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        editable: true
      });

      nowEditingShape.setMap(map);
      nowEditingShape.addListener('mouseup', function() {
        var newShape = []
        this.getPaths().getArray()[0].forEach(coord => {newShape.push(coord.lng(), coord.lat())})
        t.setState({ setCoords: newShape })
      })
    });
  }
  render() {
    return (
      <div className="map-wrapper">
        <div className="selection-name">Pam</div>
        <button onClick={this.handleButton.bind(this)}>Set New Coords</button>
        <br></br>
        <div id="map">
        </div>
      </div>
    );
  }
}

export default Map;
