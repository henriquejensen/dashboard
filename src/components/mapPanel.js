import React, { Component } from "react";
import ajax from "superagent";

import {Gmaps, Marker, Circle} from 'react-gmaps';

var coords = {
  lat: "",
  lng: ""
};

export default class MapPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      esperar: true,
      message: ""
    }
  }

  componentWillMount() {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+this.props.endereco.replace(/\s/g, "-");
    ajax.get(url)
      .then((response) => {
        const results = JSON.parse(response.text);
        if(results.results.length > 0) {
            coords.lat = results.results[0].geometry.location.lat;
            coords.lng = results.results[0].geometry.location.lng;
            this.setState({
              esperar: false,
            })
        } else {
            this.setState({
              esperar: true,
              message: "Endereço não encontrado"
            })
        }
    });
  }

  onMapCreated(map) {
  }

  onDragEnd(e) {
  }

  onClick(e) {
  }

  render() {
    return (
      !this.state.esperar ? <Gmaps
        height={'300px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={18}
        params={{key: 'AIzaSyDrjaImSSsOUSh9d5KDq9RVnHKtNSI_GJI'}}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <Circle
          lat={coords.lat}
          lng={coords.lng}
          radius={50}
          onClick={this.onClick} />
      </Gmaps> : <div className="text-center alert alert-info">{this.state.message}</div>
    )
  }
}