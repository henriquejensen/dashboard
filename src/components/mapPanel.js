import React, { Component } from "react";
import ajax from "superagent";

export default class MapPanel extends React.Component {
  constructor(props) {
    super(props);

    this.geocode = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.geocode = new GMaps({
        div: '#routingmap',
        lat: 38.890792,
        lng: -77.048518,
        scrollwheel: false,
        zoom: 16
      });
      this.geoCode(this.props.rua + ", " + this.props.cidade)
    }, 300);
  }

  buscaPorCEP() {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+this.props.cep;
    ajax.get(url).then((response) => {

      if(JSON.parse(response.text).results.length) {
        this.geocode.setCenter(JSON.parse(response.text).results[0].geometry.location.lat, JSON.parse(response.text).results[0].geometry.location.lng);
        this.geocode.addMarker({
          lat: JSON.parse(response.text).results[0].geometry.location.lat,
          lng: JSON.parse(response.text).results[0].geometry.location.lng,
        });
      } else {
        this.geoCode(this.props.cidade);
      }
    });
  }

  geoCode(address) {
    GMaps.geocode({
      address: address,
      callback: (results, status) => {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          this.geocode.setCenter(latlng.lat(), latlng.lng());
          this.geocode.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            infoWindow: {
              content: '<div><strong>Address:</strong> '+results[0].formatted_address+'</div>'
            }
          });
        } else {
          this.buscaPorCEP();
        }
      }
    });
  }

  render() {
    return (
        <div className="panel panel-default">
            <div className="panel-heading text-center">
                <div id='routingmap' style={{height: 300}}></div>
            </div>
        </div>
    );
  }
}