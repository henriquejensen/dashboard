import moment from "moment"
import React, { Component } from 'react';

class Contador extends Component {
    state = {
        dateNow: moment()
    }
    
    render() {

        return (
            <div>
                {this.state.dateNow.toString()}<br/>
                {moment("20170805", "YYYYMMDD").fromNow()}<br/>
                {moment("20120620", "YYYYMMDD").fromNow().toString()}<br/>
                {moment().startOf('day').fromNow().toString()}<br/>
                {moment().endOf('day').fromNow().toString()}<br/>
                {moment().startOf('hour').fromNow().toString()}<br/>
                {moment().format('LT').toString()}
            </div>
        )
    }
}

export default Contador