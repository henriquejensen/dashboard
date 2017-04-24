import React, { Component } from "react";
import ajax from "superagent";

import { Gmaps, Marker, Circle } from 'react-gmaps';
import { ADDRESS_NOT_FOUND, GOOGLE_MAPS_KEY, GOOGLE_MAPS_URL } from "../../constants/utils";

var coords = {
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
    if(!this.props.latitude || !this.props.longitude) {
      var url = GOOGLE_MAPS_URL+this.props.endereco;
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
  }

  onMapCreated(map) {
  }

  onDragEnd(e) {
  }

  onClick(e) {
  }

  renderMap(latitude, longitude) {
    return (
        <Gmaps
          height={'300px'}
          lat={latitude}
          lng={longitude}
          zoom={18}
          params={{key: GOOGLE_MAPS_KEY}}
          onMapCreated={this.onMapCreated}>
          <Marker
            lat={latitude}
            lng={longitude}
            draggable={true}
            onDragEnd={this.onDragEnd} />
          <Circle
            lat={latitude}
            lng={longitude}
            radius={50}
            onClick={this.onClick} />
        </Gmaps>
    )
  }

  render() {
    return (
      this.props.latitude || this.props.longitude ?
        this.renderMap(this.props.latitude, this.props.longitude)
      : !this.state.esperar ?
        this.renderMap(coords.lat, coords.lng)
      :
        <div className="text-center alert alert-info">{ADDRESS_NOT_FOUND}</div>
    )
  }
}