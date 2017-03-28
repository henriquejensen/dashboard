import React, { Component } from "react";
import ajax from "superagent";

import { Gmaps, Marker, Circle } from 'react-gmaps';
import { ADDRESS_NOT_FOUND, GOOGLE_MAPS_KEY } from "../../constants/utils";

export default class MapPanel extends Component {

  onMapCreated(map) {
  }

  onDragEnd(e) {
  }

  onClick(e) {
  }

  render() {
    return (
      this.props.latitude || this.props.longitude ? <Gmaps
        height={'300px'}
        lat={this.props.latitude}
        lng={this.props.longitude}
        zoom={18}
        params={{key: GOOGLE_MAPS_KEY}}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={this.props.latitude}
          lng={this.props.longitude}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <Circle
          lat={this.props.latitude}
          lng={this.props.longitude}
          radius={50}
          onClick={this.onClick} />
      </Gmaps> : <div className="text-center alert alert-info">{ADDRESS_NOT_FOUND}</div>
    )
  }
}